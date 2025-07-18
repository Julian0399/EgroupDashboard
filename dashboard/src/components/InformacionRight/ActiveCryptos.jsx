import style from "./ActiveCryptos.module.css";
import { useEffect, useState } from "react";
import { getGlobalData } from "../../api/dashboardMethods";

function ActiveCryptos() {
  const [activeCryptos, setActiveCryptos] = useState(0);

  useEffect(() => {
    const fetchActiveCryptos = async () => {
      try {
        const res = await getGlobalData();
        const globalData = res.data;
        setActiveCryptos(globalData.active_cryptocurrencies);
        
      } catch (error) {
        console.error("Error fetching active cryptocurrencies:", error);
      }
    };

    fetchActiveCryptos();
  }, []);

  return (
    <div className={style.activeCryptos}>
      <h3 className={style.title}>Active Cryptocurrencies</h3>
      <p className={style.count}>Total: {activeCryptos} coins active</p>
    </div>
  );
}

export default ActiveCryptos;
