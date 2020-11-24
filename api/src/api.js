/** @format */

const express = require('express');

const database = require('./database/chart');
const industryApi = require('./database/industry');
const getData = require('./indicators/getData');
const screener = require('./database/screener');
const router = express.Router();

// search symbols
router.get('/v1/symbols', async (req, res, nxt) => {
  try {
    const { search } = req.query;

    const symbols = await database.searchSymbols(search);

    res.json(symbols);
  } catch (err) {
    nxt(err);
  }
});

// get ohlc data
router.get('/v1/symbols/:symbol/ohlc', async (req, res, nxt) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const ohlc = await database.getOHLC(symbol, from, to);

    res.json(ohlc);
  } catch (err) {
    nxt(err);
  }
});

// get indicator
router.get(
  '/v1/symbols/:symbol/indicators/:indicator',
  async (req, res, nxt) => {
    try {
      const { symbol, indicator } = req.params;
      const { from, to } = req.query;

      const values = await database.getIndicator(symbol, from, to, indicator);

      // extend to 10 bars in future
      let index = 0;
      let lastValue = null;
      let lastIndex = 0;

      while (index < values.length) {
        const value = values[index];

        if (value && value.i) {
          lastValue = value.i;
          lastIndex = index;
        } else {
          if (lastValue) {
            if (index < lastIndex + 10) value.i = lastValue;
          }
        }

        index++;
      }

      res.json(values);
    } catch (err) {
      nxt(err);
    }
  }
);

// get si
router.get('/v1/symbols/:symbol/si', async (req, res, nxt) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const values = await database.getStrangeIndicator(symbol, from, to);

    res.json(values);
  } catch (err) {
    nxt(err);
  }
});

// get ess
router.get('/v1/symbols/:symbol/ess', async (req, res, nxt) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const values = await database.getEntrySLShort(symbol, from, to);

    // extend to 10 bars in future
    let index = 0;
    let lastValue = null;
    let lastIndex = 0;

    while (index < values.length) {
      const value = values[index];

      if (value && value.i) {
        lastValue = value.i;
        lastIndex = index;
      } else {
        if (lastValue) {
          if (index < lastIndex + 10) value.i = lastValue;
        }
      }

      index++;
    }

    res.json(values);
  } catch (err) {
    nxt(err);
  }
});

// get esl
router.get('/v1/symbols/:symbol/esl', async (req, res, nxt) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;

    const values = await database.getEntrySLLong(symbol, from, to);

    // extend to 10 bars in future
    let index = 0;
    let lastValue = null;
    let lastIndex = 0;

    while (index < values.length) {
      const value = values[index];

      if (value && value.i) {
        lastValue = value.i;
        lastIndex = index;
      } else {
        if (lastValue) {
          if (index < lastIndex + 10) value.i = lastValue;
        }
      }

      index++;
    }

    res.json(values);
  } catch (err) {
    nxt(err);
  }
});

// get industry data
router.get('/v1/symbols/:secType/gid', async (req, res, nxt) => {
  try {
    const { secType } = req.params;
    const gid = await industryApi.getIndustry(secType);

    res.json(gid);
  } catch (err) {
    nxt(err);
  }
});

router.get('/v1/symbols/:ticker/finn', async (req, res, nxt) => {
  try {
    const { ticker } = req.params;
    const finn = await industryApi.companyIndustry(ticker);

    res.json(finn[0].finnhubIndustry);
  } catch (err) {
    nxt(err);
  }
});

router.get('/v1/symbols/:finnhubIndustry/ind', async (req, res, nxt) => {
  try {
    const { finnhubIndustry } = req.params;
    const ind = await industryApi.IndustryList(finnhubIndustry);

    res.json(ind);
  } catch (err) {
    nxt(err);
  }
});

//Screener
router.get('/v1/stock-data', async (req, res, nxt) => {
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
    const results = await screener
      .getStockData(payload)
      .paginate({ perPage: pageSize, currentPage: page });
    res.json({ data: results.data, pagination: results.pagination });
  } catch (err) {
    nxt(err);
  }
});

module.exports = router;
