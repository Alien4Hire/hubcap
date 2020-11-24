/** @format */

// const { default: Axios } = require("axios")

// const CompanyData = async() => {
//     const stockData = await Axios.get('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1572651390&to=1575243390&token=bsh2dt7rh5r9j22quibg')
//     return stockData
// }

// export default CompanyData;

// router.get('/v1/symbols/data', async, (req,res, nxt) => {
//     const [close, setClose] = useState(0)
//     const [high, setHigh] = useState(0)
//     const [low, setLow] = useState(0)
//     const [open, setOpen] = useState(0)
//     const[time, setTime] = useState(0)
//     const[volume, setVolume] = useState(0)

//     const roundToHundredth = (value) => {
//         return Number(value.toFixed(2));
//       };

//     const GetStockData = async() => {
//         var data = await StockData();
//         setClose(data.data.c)
//         setPreviousClose(data.data.pc)
//         setDailyChange(roundToHundredth(100 * (1 - (close / previousClose))))
//         setDailyPrice(roundToHundredth(close - previousClose))
//         return []
//     }
// })
