import style from "./MarketCard.module.css";
import { useEffect, useState } from "react";
import { getCoinsMarket } from "../../api/dashboardMethods";
import { BarChart } from "@mui/x-charts/BarChart";

export const MarketCard = () => {
  const [barData, setBarData] = useState([]);
  useEffect(() => {
    const fetchMarketCoins = async () => {
      try {
        const coins = await getCoinsMarket();
        const top5 = coins.slice(0, 5).map((coin) => ({
          id: coin.id,
          name: coin.name,
          market_cap: coin.market_cap,
        }));
        setBarData(top5);
      } catch (error) {
        console.error("Error loading bar chart data:", error);
      }
    };

    fetchMarketCoins();
  }, []);
  return (
    <div className={style.marketCard}>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: barData.map((item) => item.name),
            tickLabelStyle: { fill: "#fff" },
          },
        ]}
        series={[
          {
            data: barData.map((item) => item.market_cap),
            label: "Market Cap (USD)",
            color: "url(#gradient-area)",
          },
        ]}
        yAxis={[{ tickLabelStyle: { fill: "#fff" } }]}
        sx={{
          ".MuiChartsAxis-label": {
            fill: "#fff",
          },
          ".MuiChartsLegend-root": {
            color: "#fff",
          },
          ".MuiChartsTooltip-root": {
            color: "#000",
          },
        }}
      >
        <defs>
          <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cef86dff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#cef86dff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </BarChart>
    </div>
  );
};
