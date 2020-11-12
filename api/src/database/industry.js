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
  

exports.getIndustry = (secType) => {
    return knex('security')
        .where('security_type', secType)        
        .select({
        ticker: 'ticker',
        el: 'Entry',
        es: 'Entry_short',
        daily_change: 'daily_change'
        })
}

