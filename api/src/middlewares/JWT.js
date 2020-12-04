/** @format */

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization').substring(6);
    try {
      const webtoken = jwt.verify(token, keys.cookieKey);
      req.user = webtoken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
};
