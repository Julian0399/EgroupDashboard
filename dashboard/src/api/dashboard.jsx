import { api } from "./apiCoingecko";

export const getCoinsMarket = async () => {
    try {
        const response = await api.get('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 1000,
                page: 1,
                sparkline: true,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching markets coins:", error);
        throw error;
        
    }
}