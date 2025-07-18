import { useState, useEffect } from 'react'
import { getCoins } from '../../api/dashboard'

export const CoinList = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const data = await getCoins();
                setCoins(data.slice(0, 10)); 
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

    return (
    <div>
        <h2>Coin List</h2>
        <ul>
            {coins.map(coin => (
                <li key={coin.id}>
                    {coin.name} ({coin.symbol})
                </li>
            ))}
        </ul>
    </div>
  )
}
