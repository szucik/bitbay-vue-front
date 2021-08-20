export interface Envirenoment {
    baseURL: string,
    endpoints: {
        readonly orderbook: string
        readonly orderbookLimited: string
    }
}