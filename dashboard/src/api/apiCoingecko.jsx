import axios from 'axios';


export const api = axios.create({
    baseURL: import.meta.env.VITE_CG_DEMO_API_URL || 'https://api.coingecko.com/api/v3',
     headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_CG_DEMO_API_KEY}
});
