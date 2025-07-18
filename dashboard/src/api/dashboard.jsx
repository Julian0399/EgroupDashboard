import { api } from "./apiCoingecko";

export const getCoins = async () => {
    try {
        const response = await api.get('/coins/list', {
            params: {
                include_platform: true,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching coins:", error);
        throw error;
        
    }
}