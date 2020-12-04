const { default: Axios } = require('axios');

const roundToHundredth = (value) => {
    return Number(value.toFixed(0));
};

const stringStart = 'https://finnhub.io/api/v1/';
const stringType = 'stock';
const stringMiddle = '/candle?symbol=';
const getSymbol = 'AAPL';
const stringTime = '&resolution=D&from=';
const endTime = roundToHundredth(Date.now() / 1000);
const startTime = endTime - 31694025;
const stringEndTime = '&to=';

const ApiToken = '&token=bsh2dt7rh5r9j22quibg';
const ApiString =
    stringStart + stringType + stringMiddle + getSymbol + stringTime + startTime + stringEndTime + endTime + ApiToken;

const StockData = async () => {
    const stockData = await Axios.get(ApiString);
    return stockData;
};

export default StockData;
