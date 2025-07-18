import React, { useState, useEffect } from "react";
import {
  getCurrencies,
  getMarketChart,
  getCoinList,
} from "../../api/dashboardMethods";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import style from "./CurrencyChart.module.css";

const CurrencyChart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [marketData, setMarketData] = useState([]);
  const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
  const [selectDays, setSelectedDays] = useState(7);
  const [coinsList, setCoinsList] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const topCoins = [
    "bitcoin",
    "ethereum",
    "bnb",
    "ripple",
    "solana",
    "cardano",
    "dogecoin",
    "polkadot",
    "tron",
    "litecoin",
  ];
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);
  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const data = await getCoinList();
        setCoinsList(data);
        setLoadingCoins(false);
      } catch (error) {
        console.error("Error fetching coin list:", error);
        setLoadingCoins(false);
      }
    };

    fetchCoinList();
  }, []);
  useEffect(() => {
    const fetchMarketChart = async () => {
      if (!selectedCoinId || !selectedCurrency) return;
      try {
        const data = await getMarketChart(
          selectedCoinId,
          selectedCurrency,
          selectDays
        );
        console.log("Market chart data:", data);
        const formattedData = data.prices.map(([timestamp, price]) => ({
          timestamp,
          price,
        }));
        setMarketData(formattedData);
      } catch (error) {
        console.error("Error fetching market chart:", error);
      }
    };

    fetchMarketChart();
  }, [selectedCoinId, selectedCurrency, selectDays]);

  return (
    <div className={style.chartContainer}>
      <div className={style.selectContainer}>
        {loadingCoins ? (
          <p style={{ color: "white" }}>Loading coins...</p>
        ) : (
          <select
            className={style.coinSelect}
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(e.target.value)}
          >
            {coinsList.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        )}
        <select
          className={style.coinSelect}
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          className={style.coinSelect}
          value={selectDays}
          onChange={(e) => setSelectedDays(Number(e.target.value))}
        >
          {[1, 7, 30, 90, 180, 365].map((range) => (
            <option key={range} value={range}>
              Last {range} day{range > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className={style.chartArea}>
        <LineChart
          dataset={marketData || []}
          series={[
            {
              dataKey: "price",
              label: "Price",
              area: true,
              baseline: "min",
              color: "url(#gradient-area)",
              curve: "monotone",
            },
          ]}
          xAxis={[
            {
              dataKey: "timestamp",
              scaleType: "time",
              valueFormatter: (value) => new Date(value).toLocaleDateString(),
              labelStyle: { fill: "#fff" },
              tickLabelStyle: { fill: "#fff" },
            },
          ]}
          yAxis={[
            {
              labelStyle: { fill: "#fff" },
              tickLabelStyle: { fill: "#fff" },
            },
          ]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: "none",
            },
            "& .MuiChartsLegend-label": {
              color: "#fff",
            },
            "& .MuiChartsAxis-line": {
              stroke: "#fff",
            },
            "& .MuiChartsTick-line": {
              stroke: "#fff",
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: "#fff",
            },
            [`& .${lineElementClasses.root}`]: {
              stroke: "#93e4f8ff",
              strokeWidth: 2,
            },
          }}
        >
          <defs>
            <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cef86dff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cef86dff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </LineChart>
      </div>
    </div>
  );
};

export default CurrencyChart;
