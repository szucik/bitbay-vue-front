import { Envirenoment } from "@/model/envirenoment";

export const envirenoment: Envirenoment = {
    baseURL: 'https://api.bitbay.net/',
    endpoints: {
        orderbook: '/rest/trading/orderbook/',
        orderbookLimited: '/rest/trading/orderbook-limited/'
    }

}
