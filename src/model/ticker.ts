export interface First {
    currency: string
    minOffer: string
    scale: number
}

export interface Second {
    currency: string
    minOffer: string
    scale: number
}

export interface Market {
    code: string
    first: First
    second: Second
}

export interface Ticker {
    market: Market
    time: string
    highestBid: string
    lowestAsk: string
    rate: string
    previousRate: string
}

export interface TickerRoot {
    status: string
    ticker: Ticker
}
