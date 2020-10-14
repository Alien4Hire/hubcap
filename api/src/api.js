const express = require("express");

const database = require("./database");

const router = express.Router();

// search symbols
router.get("/v1/symbols", async (req, res, nxt) => {
  try {
    const { search } = req.query;

    const symbols = await database.searchSymbols(search);

    res.json(symbols);
  } catch (err) {
    nxt(err);
  }
});

// get ohlc data
router.get("/v1/symbols/:symbol/ohlc", async (req, res, nxt) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const ohlc = await database.getOHLC(symbol, from, to);

    res.json(ohlc);
  } catch (err) {
    nxt(err);
  }
});

router.get("/v1/stock-data", async (req, res, nxt) => {
  try {
    const payload = req.query ? req.query : {};

    // // add pagination limit and offset
    let pageSize = 20;
    let page = 1;
    if (payload && payload.limit) {
      pageSize = Number(payload.limit) || pageSize;
    }

    if (payload && payload.page) {
      page = Number(payload.page) || page;
    }
    const results = await database
      .getStockData(payload)
      .paginate({ perPage: pageSize, currentPage: page });
    res.json({ data: results.data, pagination: results.pagination });
  } catch (err) {
    nxt(err);
  }
});

module.exports = router;
