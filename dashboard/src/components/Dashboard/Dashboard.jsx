import { CoinMarketTable } from "../CoinList/CoinMarketTable";
import CurrencyChart from "../CurrencyLeft/CurrencyChart";
import LayoutInformation from "../InformacionRight/LayoutInformation";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { getMarketChart } from "../../api/dashboardMethods";

function Dashboard() {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
    const [marketData, setMarketData] = useState([]);
    const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
    const [selectDays, setSelectedDays] = useState(7);
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
    <div className={styles.container}>
      <div className={styles.backgroundGlow} />
      <div className={styles.parent}>
        <div className={styles.nav}>
          <Navbar />
        </div>
        <div className={styles.content}>
          <CurrencyChart marketData={marketData} selectedCoinId={selectedCoinId} setSelectedCoinId={setSelectedCoinId} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} selectDays={selectDays} setSelectedDays={setSelectedDays} />
        </div>
        <div className={styles.sideright}>
          <LayoutInformation marketData={marketData} />
        </div>
        <div className={styles.footer}>
          <CoinMarketTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
