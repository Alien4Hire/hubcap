const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "admin",
    password: "1a3629d9ab9c9cde72d1a5b7af5e59c42341009264fdcfee",
    database: "csv_stock_data",
  },
  pool: { min: 0, max: 100 },
});

const { attachPaginate } = require("knex-paginate");
attachPaginate();

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

const addRangeFilter = (knexObj, rangeFieldValue, rangeFieldName) => {
  const rangeValue = rangeFieldValue.split(",");
  let isValidRange = true;
  // ignore if wrong value sent
  if (rangeValue.length < 2) {
    isValidRange = false;
  } else {
    if (rangeValue[0] !== "x" || isNaN(rangeValue[0])) {
      isValidRange = false;
    }
    if (rangeValue[1] !== "x" || isNaN(rangeValue[1])) {
      isValidRange = false;
    }
  }
  if (isValidRange) {
    if (rangeValue[0] === "x") {
      knexObj.andWhereBetween(
        rangeFieldName,
        "<=",
        Number(rangeValue[1]) //max value
      );
    } else if (rangeValue[1] === "x") {
      knexObj.andWhereBetween(
        rangeFieldName,
        ">=",
        Number(rangeValue[0]) // min value
      );
    } else {
      knexObj.andWhereBetween(
        rangeFieldName,
        rangeValue.map((item) => Number(item))
      );
    }
  }
};

exports.getStockData = (payload) => {
  const knexObj = knex("security")
    .innerJoin("company_data", "company_data.ticker", "security.ticker")
    .select(
      "security.time",
      "security.date",
      "security.ticker",
      "security.close",
      "security.security_type",
      "security.daily_change",
      "security.volume",
      "company_data.name",
      "company_data.finnhubIndustry",
      "company_data.marketCapitalization"
    );
  // .groupBy(
  //   "company_data.ticker",
  // );
  if (payload && payload.date) {
    knexObj.where("security.date", payload.date);
  } else {
    const now = new Date();
    knexObj.where(
      "security.date",
      `${now.getUTCFullYear()}/${now.getUTCMonth() + 1}/${now.getUTCDate()}`
    );
  }

  if (payload && payload.market_cap_range) {
    addRangeFilter(
      knexObj,
      payload.market_cap_range,
      "company_data.marketCapitalization"
    );
    // knexObj.andWhereBetween(
    //   "company_data.marketCapitalization",
    //   payload.market_cap_range.split(",").map((item) => Number(item))
    // );
  }

  if (payload && payload.volume_range) {
    addRangeFilter(knexObj, payload.volume_range, "security.volume");
  }

  if (payload && Number(payload.entry_long)) {
    knexObj.andWhere("security.Entry", ">=", 3);
  }

  if (payload && Number(payload.entry_short)) {
    knexObj.andWhere("security.Entry_short", "<=", -3);
  }

  if (payload && payload.exchange) {
    knexObj.andWhere("company_data.security_type", payload.exchange);
  }

  if (payload && Number(payload.attar_explosion)) {
    knexObj.andWhere(function () {
      this.where("security.attar_check", "!=", 0).orWhere(
        "security.attar_checkone",
        "!=",
        0
      );
    });
  }

  // ash_check/ash_checkone not != 0 and entry >= 3/Entry_short <= -3
  if (payload && Number(payload.safe_entry)) {
    knexObj
      .andWhere(function () {
        this.where("security.entry", ">=", 3).andWhere(
          "security.Entry_short",
          "<=",
          -3
        );
      })
      .andWhere("security.ash_check", "!=", 0);
  }

  // TODO: days since entry
  if (payload && payload.days_entry_range) {
  }

  if (payload && Number(payload.william_percent_range)) {
    knexObj.andWhere(function () {
      this.where("security.R_check", "!=", 0).andWhere(
        "security.R_checkone",
        "!=",
        0
      );
    });
  }

  if (payload && payload.industry) {
    knexObj.andWhere("company_data.finnhubIndustry", payload.industry);
  }
  // console.log("Query", knexObj.toString());

  return knexObj;
};
