/** @format */
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('../models/User');

module.exports = async (req, res, next) => {
  // console.log(req.header)
  const token = req.header('access_token')
  
  if (!token) return res.status(401).json({msg: 'Please log in to continue'});
  try {
    //verify token
    const decoded = jwt.verify(token, keys.cookieKey);
    // console.log(decoded)
    //Add user from payload
    req.user = decoded
    next();
  } catch(e) {
    res.status(400).json({msg: 'Please log in to continue'})
  }
}
//     // console.log(req.headers.cookie)
//     const myToken = req.headers.cookie
//     console.log(req.headers.cookie)
//     const token = myToken.substr(myToken.indexOf('access_token=') + 13);//[1] //var afterComma = str.substr(str.indexOf(",") + 1);
//     console.log(token)
//     try {
//       const webtoken = jwt.verify(token, keys.cookieKey);
//       console.log(webtoken)
//       const existingUser = await user.findOne({_id: webtoken.sub});
//       req.user = existingUser
//       console.log(existingUser)
//     } catch (err) {
//       console.log(err);
//     }
//   } else if (req.user) {
//     next()
//   }
//    else {
//     return res.status(401).send({ error: 'You must log in!' });
//   }
//   next();
// };


