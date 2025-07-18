import { CoinList } from "../CoinList/CoinList";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return(
  <div className={styles.container}>
    <div className={styles.backgroundGlow} />
    <div className={styles.parent}>
        <div className={styles.nav}>
        <h1>Crypto List</h1>
        </div>
        <div className={styles.content}>
            <CoinList />
        </div>
        <div className={styles.sideright}>
            <h2>Right Sidebar</h2>
        </div>
        <div className={styles.footer}>
            <p>Footer content</p>
        </div>
    </div>
  </div>
  )
}

export default Dashboard;
