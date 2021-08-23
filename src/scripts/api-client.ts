import { envirenoment } from '@/envirenoment/envirenoment'
import { Orderbook } from '@/model/orderbook'
import { Ticker, TickerRoot } from '@/model/ticker'
import Axios, { AxiosObservable } from 'axios-observable'
import { from } from 'rxjs'

export class ApiClient {
    private static instance: ApiClient
    public static getInstance(): ApiClient {
        if (!ApiClient.instance) ApiClient.instance = new ApiClient()
        return ApiClient.instance
    }
    // eslint-disable-next-line
    private constructor() { }
    client: Axios = Axios.create({
        baseURL: envirenoment.baseURL,
        timeout: 1000,
        headers: { 'Content-Type': 'application/json' }
    })

    getOrderbook(currencyPair: string): AxiosObservable<Orderbook> {
        return from(
            this.client.get(`${envirenoment.endpoints.orderbook}/${currencyPair}`)
        )
    }

    getOrderbookLimkted(
        currencyPair: string,
        limit: number
    ): AxiosObservable<Orderbook> {
        return from(
            this.client.get(
                `${envirenoment.endpoints.orderbookLimited}${currencyPair}/${limit}`
            )
        )
    }

    getTicker(currencyPair: string): AxiosObservable<TickerRoot> {
        return from(
            this.client.get(`${envirenoment.endpoints.ticker}${currencyPair}`)
        )
    }
}
