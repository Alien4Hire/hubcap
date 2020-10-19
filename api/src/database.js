const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: '1a3629d9ab9c9cde72d1a5b7af5e59c42341009264fdcfee',
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

exports.getStrangeIndicator = (symbol = '', from, to) => {
  return knex('security')
    .where('ticker', symbol)
    .where('time', '>=', from)
    .where('time', '<=', to)
    .select({
      i: 'strangeindicator',
      t: 'time'
    })
}

exports.getEntrySLShort = (symbol = '', from, to) => {
  return knex('security')
    .where('ticker', symbol)
    .where('time', '>=', from)
    .where('time', '<=', to)
    .select({
      i: 'entrySLShort',
      t: 'time'
    })
}
