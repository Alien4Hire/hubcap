const token = require('../services/jwt');
const watchlist = require('../models/Watchlist');
const user = require('../models/User');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const bcrypt = require('bcryptjs');
const Axios = require('axios');
const { default: StockData } = require('../../client/src/components/TradingLab/StockData');


module.exports = (app) => {

    //Get Stock Data (Finnhub)
    app.get('/api/getStockNews/:symbol', requireLogin, async (req, res, next) => {
        const sub = req.user.sub
        const userLists = await user.find({_id: sub})
        // console.log(userLists)
        var symbols = req.params.symbol
        const NewsData = await Axios.get(
            'https://newsapi.org/v2/everything?q=' + symbols + '&apiKey=a0cdb6e95f6548789387cda8672a51da'
        );
        // console.log(NewsData.data.articles)
        try {
            res.send(NewsData.data.articles);
            // res.send(userLists);
        } catch (err) {
            res.status(422).send(err);
          }
      });

    //Get Stock Chart (Finhub API)
    app.get('/api/getChartData/:symbol', requireLogin, async (req, res, next) => {
       ////////Use this to call Finhub API
        const roundToHundredth = (value) => {
            return Number(value.toFixed(0));
        };

        const stringStart = 'https://finnhub.io/api/v1/';
        const stringType = 'stock'
        const stringMiddle = '/candle?symbol=';
        const getSymbol = req.params.symbol;
        const stringTime = '&resolution=D&from=';
        const endTime = roundToHundredth(Date.now() / 1000);
        const startTime = endTime - 31694025;
        const stringEndTime = '&to=';

        const ApiToken = '&token=bsh2dt7rh5r9j22quibg';
        const ApiString =
            stringStart + stringType + stringMiddle + getSymbol + stringTime + startTime + stringEndTime + endTime + ApiToken;
        const stocksData = await Axios.get(ApiString);
        console.log('chart data')
        console.log(stocksData.data)
        try {
            res.send({...stocksData.data, lengths: stocksData.data.c.length});
        } catch (err) {
            res.status(422).send(err);
          }
      });

    //Get Stock Daily (Google API)
    app.get('/api/getStockData/:symbol', requireLogin, async (req, res, next) => {
       ////////Use this to call Finhub API
        const roundToHundredth = (value) => {
            return Number(value.toFixed(0));
        };

        const stringStart = 'https://finnhub.io/api/v1/';
        const stringType = 'stock'
        const stringMiddle = '/profile2?symbol=';
        const getSymbol = req.params.symbol;
        // const stringTime = '&resolution=D&from=';
        // const endTime = roundToHundredth(Date.now() / 1000);
        // const startTime = endTime
        // const stringEndTime = '&to=';

        const ApiToken = '&token=bsh2dt7rh5r9j22quibg';
        const ApiString =
            stringStart + stringType + stringMiddle + getSymbol + ApiToken;
        const stocksData = await Axios.get(ApiString);
        console.log('chart data')
        // console.log(stocksData.data)
        try {
            res.send(stocksData.data);
        } catch (err) {
            res.status(422).send(err);
          }
      });

}

