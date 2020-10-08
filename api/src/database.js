const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "admin",
    password: "1a3629d9ab9c9cde72d1a5b7af5e59c42341009264fdcfee",
    database: "csv_stock_data",
  },
});

exports.searchSymbols = async (search = "") => {
  const results = await knex("security")
    .distinct("ticker")
    .where("ticker", "like", `%${search.toUpperCase()}%`);

  return results.map((row) => {
    return row.ticker;
  });
};

exports.getOHLC = (symbol = "", from, to) => {
  return knex("security")
    .where("ticker", symbol)
    .where("time", ">=", from)
    .where("time", "<=", to)
    .select({
      o: "open",
      h: "high",
      l: "low",
      c: "close",
      t: "time",
    });
};

exports.getStockData = (payload) => {
  let pageSize = 20;
  let offset = 0;
  const knexObj = knex("company_data")
    .innerJoin("security", "company_data.ticker", "security.ticker")
    .select(
      "company_data.ticker",
      "company_data.name",
      "company_data.class",
      "company_data.finnhubIndustry",
      knex.raw("sum(company_data.marketCapitalization) as marketCapSum"),
      knex.raw("sum(security.close) as closeSum"),
      knex.raw("sum(security.volume) as volumeSum"),
      knex.raw("sum(security.daily_change) as dailyChangeSum")
    )
    .groupBy(
      "company_data.ticker",
      "company_data.name",
      "company_data.class",
      "company_data.finnhubIndustry"
    );
  // knexObj.where("1", "=", "1");
  if (payload && payload.market_cap_range) {
    knexObj.andWhereBetween(
      "company_data.marketCapitalization",
      payload.market_cap_range.split(",").map((item) => Number(item))
    );
  }
  if (payload && payload.volume_range) {
    knexObj.andWhereBetween(
      "security.volume",
      payload.volume_range.split(",").map((item) => Number(item))
    );
  }
  if (payload && Boolean(payload.entry_long)) {
    knexObj.andWhere("security.Entry", ">=", 3);
  }
  if (payload && Boolean(payload.entry_short)) {
    knexObj.andWhere("security.Entry_short", "<=", 3);
  }
  if (payload && payload.exchange) {
    knexObj.andWhere("company_data.class", payload.exchange);
  }

  if (payload && Boolean(payload.attar_explosion)) {
    knexObj.andWhere(function () {
      this.where("security.attar_check", "!=", 0).orWhere(
        "security.attar_checkone",
        "!=",
        0
      );
    });
  }

  // ash_check/ash_checkone not != 0 and entry >= 3/Entry_short <= -3
  if (payload && Boolean(payload.safe_entry)) {
    knexObj
      .andWhere(function () {
        this.where("security.ash_check", "!=", 0).orWhere(
          "security.ash_checkone",
          "!=",
          0
        );
      })
      .andWhere(function () {
        this.where("security.entry", ">=", 3).andWhere(
          "security.Entry_short",
          "<=",
          -3
        );
      });
  }

  if (payload && Boolean(payload.william_percent_range)) {
    knexObj.andWhere(function () {
      this.where("security.R_check", 1).andWhere("security.R_checkone", -1);
    });
  }

  if (payload && payload.industry) {
    knexObj.andWhere("company_data.finnhubIndustry", payload.industry);
  }

  if (payload && payload.limit) {
    pageSize = Number(payload.limit) || pageSize;
  }

  if (payload && payload.offset) {
    offset = Number(payload.offset) || offset;
  }

  knexObj.limit(pageSize).offset(offset);

  return knexObj;
};
