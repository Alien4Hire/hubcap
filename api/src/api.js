const express = require('express')

const database = require('./database')

const router = express.Router()

// search symbols
router.get('/v1/symbols', async (req, res, nxt) => {
  try {
    const { search } = req.query

    const symbols = await database.searchSymbols(search)

    res.json(symbols)
  } catch (err) { nxt(err) }
})

// get ohlc data
router.get('/v1/symbols/:symbol/ohlc', async (req, res, nxt) => {
  try {
    const { symbol } = req.params
    const { from, to } = req.query

    const ohlc = await database.getOHLC(symbol, from, to)

    res.json(ohlc)
  } catch (err) { nxt(err) }
})

// get si
router.get('/v1/symbols/:symbol/si', async (req, res, nxt) => {
  try {
    const { symbol } = req.params
    const { from, to } = req.query

    const ohlc = await database.getStrangeIndicator(symbol, from, to)

    res.json(ohlc)
  } catch (err) { nxt(err) }
})

module.exports = router
