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
          <span>Select currency pair: </span>
          <select v-model="selectedCurrency.currency" @change="getOrderbook">
            <option
              v-for="option in market"
              v-bind:value="option"
              :key="option"
            >
              {{ option }}
            </option>
          </select>
          <select
            v-model="selectedCurrency.currencyPair"
            @change="getOrderbook"
          >
            <option
              v-for="option in currency"
              v-bind:value="option"
              :key="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="order-wrapper">
          <div class="col order-book buy-box">
            <OrdersList
              :data="this.buyOrders"
              label="Buy orders"
              :currency="selectedCurrency.currencyPair"
            />
          </div>
          <div class="col order-book sell-box">
            <OrdersList
              :data="this.sellOrders"
              label="Sell orders"
              :currency="selectedCurrency.currencyPair"
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
  buyOrders: Buy[] = []
  sellOrders: Sell[] = []
  market: string[] = ['BTC', 'ETH', 'XRP']
  currency: string[] = ['PLN', 'USD', 'USDT']
  selectedCurrency = {
    currency: 'BTC',
    currencyPair: 'PLN'
  }

  _currencyPairs = 'PLN-BTC'
  set currencyPairs(value: string) {
    this._currencyPairs = value
  }

  get currencyPairs(): string {
    return this._currencyPairs
  }

  setCurrencyPair(): string {
    return this.selectedCurrency.currency.concat(
      '-',
      this.selectedCurrency.currencyPair.toUpperCase()
    )
  }

  getOrderbook(): void {
    this.currencyPairs = this.setCurrencyPair()
    timer(0, 5000)
      .pipe(
        switchMap(() =>
          this.apiClient.getOrderbookLimkted(this.currencyPairs, 10)
        )
      )
      .subscribe(
        (response) => {
          this.buyOrders = response.data.buy
          this.sellOrders = response.data.sell
        },
        (error) => console.log(error)
      )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    this.getOrderbook()
  }
}
</script>

<style lang="scss">
@import './assets/style/main.scss';
</style>
