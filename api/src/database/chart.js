/** @format */

const keys = require('../config/keys');
const { default: Axios } = require('axios');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: keys.MysqlPassword,
    database: 'csv_stock_data',
  },
});

exports.searchSymbols = async (search = '') => {
  const results = await knex('security')
    .distinct('ticker')
    .where('ticker', 'like', `%${search.toUpperCase()}%`);

  return results.map((row) => {
    return row.ticker;
  });
};

exports.getOHLC = (symbol = '', from, to) => {
  return knex('security')
    .where('ticker', symbol)
    .where('time', '>=', from)
    .where('time', '<=', to)
    .select({
      o: 'open',
      h: 'high',
      l: 'low',
      c: 'close',
      v: 'volume',
      t: 'time',
    });
};

exports.getExtraCandles = (symbol = '', time) => {
  const roundToHundredth = (value) => {
    return Number(value.toFixed(0));
  };

  const stringStart = 'https://finnhub.io/api/v1/';
  const stringType = 'stock';
  const stringMiddle = '/candle?symbol=';
  const getSymbol = 'AAPL';
  const stringTime = '&resolutiontime=';
  const endTime = roundToHundredth(Date.now() / 1000);
  const startTime = time; //endTime - 2613190;
  const stringEndTime = '&to=';

  const ApiToken = '&token=bsh2dt7rh5r9j22quibg';
  const ApiString =
    stringStart +
    stringType +
    stringMiddle +
    getSymbol +
    stringTime +
    startTime +
    stringEndTime +
    endTime +
    ApiToken;
  const stockData = Axios.get(ApiString);
  return stockData;
};

exports.getIndicator = (symbol = '', from, to, indicator = '') =>
  knex('security')
    .where('ticker', symbol)
    .where('time', '>=', from)
    .where('time', '<=', to)
    .select({ t: 'time' })
    .select({ i: indicator });

// .select({ SmB:  })
//localhost:3500/v1/symbols/EBTC/ohlc?from=1565798862&to=1566749243
// exports.getStrangeIndicator = (symbol = '', from, to) => {
//   return knex('security')
//     .where('ticker', symbol)
//     .where('time', '>=', from)
//     .where('time', '<=', to)
//     .select({
//       i: 'strangeindicator',
//       t: 'time'
//     })
// }

// exports.getEntrySLShort = (symbol, from, to) => {
//   return commonQuery(symbol, from, to)
//     .select({ i: 'entrySLShort' })
// }

// exports.getEntrySLLong = (symbol, from, to) => {
//   return commonQuery(symbol, from, to)
//     .select({ i: 'entrySLLong' })
// }
