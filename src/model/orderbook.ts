export interface Envirenoment {
    baseURL: string
    endpoints: {
        readonly orderbook: string
        readonly orderbookLimited: string
    }
}
export interface Sell {
    ra: string
    ca: string
    sa: string
    pa: string
    co: number
}
export interface Buy {
    ra: string
    ca: string
    sa: string
    pa: string
    co: number
}
export interface Orderbook {
    status: string
    sell: Sell[]
    buy: Buy[]
    timestamp: string
    seqNo: string
}
