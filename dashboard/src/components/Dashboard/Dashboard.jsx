import { CoinMarketTable } from "../CoinList/CoinMarketTable";
import CurrencyChart from "../CurrencyRight/CurrencyChart";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return(
  <div className={styles.container}>
    <div className={styles.backgroundGlow} />
    <div className={styles.parent}>
        <div className={styles.nav}>
        <Navbar />
        </div>
        <div className={styles.content}>
            <CurrencyChart />
        </div>
        <div className={styles.sideright}>
            <h2>Right Sidebar</h2>
        </div>
        <div className={styles.footer}>
            <CoinMarketTable />
        </div>
    </div>
  </div>
  )
}

export default Dashboard;
