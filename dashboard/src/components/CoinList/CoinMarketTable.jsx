import { useState, useEffect } from "react";
import { getCoinsMarket } from "../../api/dashboard";
import { DataGrid } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import style from "./CoinMarketTable.module.css";

export const CoinMarketTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoinsMarket();
        setCoins(data);
        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "symbol", headerName: "Symbol", width: 120 },
    {
      field: "current_price",
      headerName: "Current Price (USD)",
      type: "number",
      flex: 1,
    },
    {
      field: "market_cap",
      headerName: "Market Cap (USD)",
      type: "number",
      flex: 1,
    },
    {
      field: "total_volume",
      headerName: "Total Volume (USD)",
      type: "number",
      flex: 1,
    },
    {
      field: "price_change_percentage_24h",
      headerName: "24h Price Change (%)",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        const value = params.value ?? 0;
        const isPositive = value >= 0;
        const progress = Math.min(Math.abs(value), 100);
        return (
          <div className={style.progressContainer}>
            <div className={style.progressBar}>
              <div
                className={isPositive ? style.positive : style.negative}
                style={{ width: `${progress}%` }}
              ></div>
              <span className={style.progressValue}>{value.toFixed(2)}%</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "sparkline_in_7d",
      headerName: "Sparkline",
      width: 200,
      renderCell: (params) =>
        params.value?.price?.length ? (
          <SparkLineChart data={params.value.price} />
        ) : (
          <span style={{ fontSize: "0.75rem", color: "#ccc" }}>No data</span>
        ),
    },
  ];
  const rows = coins.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    sparkline_in_7d: coin.sparkline_in_7d,
  }));

  return (
    <div className={style.tableContainer}>
      <DataGrid sx={{
    backgroundColor: 'transparent', 
    border: 'none',
    color: '#fff', 
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #444', 
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#1e1e1e',
      color: 'black',
      borderBottom: '1px solid #444',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#222',
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: 'white',
      color: 'white',
      borderTop: '1px solid #444',
    },
    '& .MuiSvgIcon-root': {
      color: 'black',
    },
    '& .MuiHeader-root': {
      backgroundColor: 'transparent',
      color: 'black',
    },

  }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        loading={loading}
        disableRowSelectionOnClick
      />
    </div>
  );
};
