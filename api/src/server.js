const express = require('express')
const cors = require('cors')

const api = require('./api')

const app = express()
const port = 3500

app.use(cors())
app.use(api)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
