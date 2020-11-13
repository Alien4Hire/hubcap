const { default: Axios } = require("axios")

const StockData = async() => {
    const stockData = await Axios.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token=bsh2dt7rh5r9j22quibg')
    return stockData
}

export default StockData;