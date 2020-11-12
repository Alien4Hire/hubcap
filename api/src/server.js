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

const PORT = process.env.PORT || port;
app.listen(PORT);
