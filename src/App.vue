<template>
  <div id="app">
    <section class="container">
      <div class="content">
        <header class="header">
          <span class="logo"
            ><img alt="Bitbay logo" src="./assets/logo.svg"
          /></span>
          <h1><span>BitBay</span> <small>Orders book</small></h1>
        </header>
        <div class="col select">
          <span>Select currency pair: {{ selectedCurrency }}</span>
          <select v-model="selectedCurrency">
            <option
              v-for="option in options"
              v-bind:value="option.value"
              :key="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="order-wrapper">
          <div class="col order-book buy-box">
            <OrdersList
              :data="this.buyOrders"
              label="Buy orders"
              :currency="selectedCurrency"
            />
          </div>
          <div class="col order-book sell-box">
            <OrdersList
              :data="this.sellOrders"
              label="Sell orders"
              :currency="selectedCurrency"
            />
          </div>
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
import OrdersList from './components/OrdersList.vue'
import { timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ApiClient } from '../src/scripts/api-client'
import { Buy, Sell } from './model/orderbook'
@Component({
  components: {
    OrdersList
  }
})
export default class App extends Vue {
  apiClient: ApiClient = ApiClient.getInstance()
  buyOrders: Array<Buy> = []
  sellOrders: Array<Sell> = []
  options = [
    { text: 'BTC-PLN', value: 'PLN' },
    { text: 'BTC-USD', value: 'USD' }
  ]
  selectedCurrency = 'USD'

  getOrderbook(): void {
    const pair = 'BTC-PLN'
    timer(0, 1000)
      .pipe(switchMap(() => this.apiClient.getOrderbookLimkted(pair, 10)))
      .subscribe(
        (response) => {
          this.buyOrders = response.data.buy
          this.sellOrders = response.data.sell
        },
        (error) => console.log(error)
      )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    this.getOrderbook()
  }
}
</script>

<style lang="scss">
@import './assets/style/main.scss';
</style>
