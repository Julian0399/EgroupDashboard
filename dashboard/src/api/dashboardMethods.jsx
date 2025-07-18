import { api } from "./apiCoingecko";

export const getCoinsMarket = async () => {
  try {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 1000,
        page: 1,
        sparkline: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching markets coins:", error);
    throw error;
  }
};

export const getCurrencies = async () => {
  try {
    const response = await api.get("/simple/supported_vs_currencies");
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};

export const getMarketChart = async (id, currency, days = 7) => {
  try {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days,
        interval: "daily",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market chart:", error);
    throw error;
  }
};

export const getCoinList = async () => {
  try {
    const response = await api.get("/coins/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
}