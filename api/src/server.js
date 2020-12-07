/** @format */

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const cors = require('cors');

const api = require('./api');

//models & services
require('./models/User');
require('./models/Survey');
require('./services/passport');
//database stuff
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }).then(
  () => {
    console.log('Connected to Mongo') },
  err => {
    console.error('Mongo Connection error', err)
  }
);

const app = express();
const port = 3500;

app.use(cors());
app.use(api);

//app.use auth and billing
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/JWT'));

require('./routes/authRoutes')(app);

require('./routes/billingRoutes')(app);
//deletevvvv
// require('./routes/surveyRoutes')(app);

//switch dev + prod
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || port;
app.listen(PORT);
