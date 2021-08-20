<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <section class="container">
      <header class="header">
        <span class="logo"
          ><img alt="Bitbay logo" src="./assets/logo.svg"
        /></span>
        <h1><span>BitBay</span> <small>current list of orders</small></h1>
        <!-- <img alt="Bitbay logo" src="./assets/logo.png" /> -->
      </header>
      <div class="col select">
        <span>Select currency pair: {{ selected }}</span>
        <select v-model="selected">
          <option
            v-for="option in options"
            v-bind:value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="col order-book buy-box">
        <div class="fieldset">
          <h2>Buy orders</h2>
          <ul>
            <li v-for="(item, index) in this.buy" :key="index">
              {{ index + 1 }}: {{ item.ra }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col order-book sell-box">
        <div class="fieldset">
          <h2>Sell orders</h2>
          <ul>
            <li v-for="(item, index) in this.sell" :key="index">
              {{ index + 1 }}: {{ item.ra }}
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <h3>Created By Marcin Szut</h3>
        <span>Copyright © 2021</span>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import { timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ApiClient } from '../src/scripts/api-client'
import { Buy, Orderbook, Sell } from './model/orderbook'
@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  apiClient: ApiClient = ApiClient.getInstance()
  buy: Array<Buy> = []
  sell: Array<Sell> = []
  orderbook: Orderbook = {} as Orderbook
  options = [
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: 'C' }
  ]
  selected = 'A'

  getData(): void {
    const pair = 'BTC-PLN'
    timer(0, 4000)
      .pipe(switchMap(() => this.apiClient.getOrderbookLimkted(pair, 10)))
      .subscribe(
        (response) => {
          this.orderbook = response.data
          this.buy = response.data.buy
          this.sell = response.data.sell
          // console.log('Buy: ', this.buy)
          // console.log('Sell: ', this.orderbook.sell)
        },
        (error) => console.log(error)
      )
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    this.getData()
  }
}
</script>

<style lang="scss">
$base-color: #27426b;
$box-shadow: #0e182c;
$box-height: 7px;
$double-border: #0e182c;
$border-color2: #57bff4;
$green: #64d0b4;
$red: #ea5043;

%pixel-art {
  box-shadow: (-$box-height) 0 0 0 $box-shadow, $box-height 0 0 0 $box-shadow,
    0 (-$box-height) 0 0 $box-shadow, 0 $box-height 0 0 $box-shadow;
}
.logo {
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  margin: 0 15px;
  img {
    @extend %pixel-art;
    border-radius: 50%;
    max-width: 60px;
  }
}
body {
  font-family: System, monospace;
  background: $border-color2;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 15px;
}
h2 {
  font-size: 18px;
  padding: 8px 0;
  text-align: center;
  color: $border-color2;
}
.col {
  margin: 15px 0;
  padding: 8px;
  box-sizing: border-box;
}
.fieldset {
  position: relative;
  border: 1px solid #fcfeff;
  padding: 15px 0;
  h2 {
    position: absolute;
    left: 50%;
    top: -15px;
    margin: 0;
    z-index: 2;
    background: #2f353e;
    padding: 1px 32px;
    margin-left: -80px;
  }
}
.pixel-art {
  @extend %pixel-art;
}

.header {
  @extend %pixel-art;
  padding: 15px;
  text-align: center;
  background: #fcfeff;
  margin-bottom: 55px;
  display: flex;
  h1 {
    margin: 0;
    line-height: 60px;
    span {
      padding-right: 15px;
      border-right: 2px solid $base-color;
    }
  }
}

footer {
  margin-top: 55px;
  background: #243350;
  font-size: 12px;
  text-align: center;
  padding: 5px;
  color: #758eb7;
  box-shadow: (-$box-height) 0 0 0 $box-shadow, $box-height 0 0 0 $box-shadow,
    0 (-$box-height) 0 0 $box-shadow, 0 $box-height 0 0 $box-shadow;
  h3 {
    margin: 5px 0;
  }
}

.select {
  text-align: center;
  margin: 30px 0;
  background: #2f353e;
  color: #57bff4;
  @extend %pixel-art;
  span {
    margin-right: 15px;
  }
}

.order-book {
  @extend %pixel-art;
  margin: 30px 0;
  padding: 25px;
  // background: #f8f9fb;
  background: #2f353e;
  // border: 6px double #fcfeff;

  &.sell-box {
    li {
      color: $red;
    }
  }
  &.buy-box {
    li {
      color: $green;
    }
  }

  ul {
    list-style: none;
    li {
      &:first-of-type {
        color: $border-color2;
      }
    }
  }
}
</style>
