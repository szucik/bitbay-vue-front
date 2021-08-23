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
          <div class="currency-pairs">
            <span>Select currency pairs: </span>
            <div class="select-box">
              <select
                v-model="selectedCurrency.currency"
                @change="getOrderbook"
              >
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
          </div>
          <div class="spread">
            <span>Current spread: {{ currentSpread }}</span>
          </div>
        </div>
        <div class="order-wrapper">
          <div class="col order-book buy-box">
            <OrdersList
              :data="buyOrders"
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
import { timer, forkJoin } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { ApiClient } from '../src/scripts/api-client'
import { Buy, Sell } from './model/orderbook'
import { AxiosError } from 'axios'

import { Ticker } from './model/ticker'
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
  ticker: Ticker = {} as Ticker
  currentSpread = ''

  getOrderbook(): void {
    timer(0, 2000)
      .pipe(
        concatMap(() =>
          forkJoin({
            orderbook: this.apiClient.getOrderbookLimkted(
              `${this.selectedCurrency.currency}-${this.selectedCurrency.currencyPair}`.toUpperCase(),
              10
            ),
            ticker: this.apiClient.getTicker(
              `${this.selectedCurrency.currency}-${this.selectedCurrency.currencyPair}`.toUpperCase()
            )
          })
        )
      )
      .subscribe(
        (response) => {
          this.buyOrders = response.orderbook.data.buy
          this.sellOrders = response.orderbook.data.sell
          this.ticker = response.ticker.data.ticker
          this.currentSpread = this.setCurrentSpread()
        },
        (error: AxiosError) => {
          console.log(error)
        }
      )
  }

  setCurrentSpread(): string {
    const spread =
      parseFloat(this.ticker.lowestAsk) - parseFloat(this.ticker.highestBid)
    return spread.toFixed(2)
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
