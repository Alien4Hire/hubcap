const { default: Axios } = require("axios")

const CompanyData = async() => {
    const stockData = await Axios.get('https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=bsh2dt7rh5r9j22quibg')
    return stockData
}

export default CompanyData;