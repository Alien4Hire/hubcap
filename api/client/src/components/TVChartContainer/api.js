import axios from 'axios';
import { symbol } from 'prop-types';

export default {
    searchSymbols: async (search) => {
        const res = await axios.get(`http://localhost:3500/v1/symbols?search=${search}`);
        // console.log('here');
        // console.log(res);
        return res.data;
    },
    getOHLC: async (symbol, from, to) => {
        const res = await axios.get(`http://localhost:3500/v1/symbols/${symbol}/ohlc?from=${from}&to=${to}`);
        return res.data;
    },
    getIndicator: async (symbol, indicator = '', from, to) => {
        const res = await axios.get(
            `http://localhost:3500/v1/symbols/${symbol}/indicators/${indicator}?from=${from}&to=${to}`
        );

        return res.data;
    },
    getCompleteOHLC: async (symbol, from, to) => {
        const res = await axios.get(
            `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${from}&to=${to}&token=bsh2dt7rh5r9j22quibg`
        );
    },
};
