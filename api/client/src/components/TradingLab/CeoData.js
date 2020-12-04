//https://finnhub.io/api/v1/stock/executive?symbol=AAPL&token=bsh2dt7rh5r9j22quibg

const { default: Axios } = require('axios');

const CeoData = async () => {
    const CeoData = await Axios.get('https://finnhub.io/api/v1/stock/executive?symbol=AAPL&token=bsh2dt7rh5r9j22quibg');
    return CeoData;
};

export default CeoData;
