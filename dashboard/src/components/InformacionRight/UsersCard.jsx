import style from "./UsersCard.module.css";
import { useMemo } from "react";
import { SparkLineChart } from "@mui/x-charts";

const UsersCard = () => {
  const randomUsers = Math.floor(Math.random() * 10000 + 5000);
  const userTrend = useMemo(() => {
    const trend = [];
    for (let i = 0; i < 4; i++) {
      trend.push(Math.floor(Math.random() * 10000 + 5000));
    }
    trend.push(randomUsers);
    return trend;
  }, [randomUsers]);
  const formatNumber = (num) => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toSring();
  };
  console.log("User trend data:", userTrend);
  return (
    <div className={style.usersCard}>
      <h3 className={style.cardTitle}>Users</h3>
      <div className={style.cardContainer}>
      <p className={style.cardValue}>{formatNumber(randomUsers)} </p>
      <div className={style.sparkLineContainer}>
        <SparkLineChart
        height={100}
          data={userTrend}
          showHighlight={true}
          showTooltip={true}
          area
          curve="monotone"
          colors={["#4caf50"]}
        />
      </div>
      </div>
    </div>
  );
};

export default UsersCard;
