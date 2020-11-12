const keys = require('../config/keys');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: keys.MysqlPassword,
    database: 'csv_stock_data'
  }
})

exports.searchSymbols = async (search = '') => {
  const results = await knex('security')
    .distinct('ticker')
    .where('ticker', 'like', `%${search.toUpperCase()}%`)

  return results.map((row) => {
    return row.ticker
  })
}

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
      t: 'time'
    })
}

exports.getIndicator = (symbol = '', from, to, indicator = '') => knex('security')
  .where('ticker', symbol)
  .where('time', '>=', from)
  .where('time', '<=', to)
  .select({ t: 'time' })
  .select({ i: indicator })
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
