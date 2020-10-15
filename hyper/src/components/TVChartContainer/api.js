import axios from 'axios'

export default {
  searchSymbols: async (search) => {
    const res = await axios.get(`http://localhost:3500/v1/symbols?search=${search}`)

    return res.data
  },
  getOHLC: async (symbol, from, to) => {
    const res = await axios.get(`http://localhost:3500/v1/symbols/${symbol}/ohlc?from=${from}&to=${to}`)

    return res.data
  },
  getStrangeIndicator: async (symbol, from, to) => {
    const res = await axios.get(`http://localhost:3500/v1/symbols/${symbol}/si?from=${from}&to=${to}`)

    return res.data
  }
}
