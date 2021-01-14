/** @format */

const token = require('../services/jwt');
const passport = require('passport');
const user = require('../models/User');
const watchlist = require('../models/Watchlist');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const bcrypt = require('bcryptjs');


module.exports = (app) => {
  //local
  app.post(
    '/auth/register',
    async (req, res, next) => {
      const {email, password} = req.body
      //find user by email, if exists tell user to login
      const existingUser = await user.findOne({ email });
      //If a user exists check which signup method they used
      if (existingUser) {
        if (existingUser.googleId) {
          return res.json('Login with Google');
        } else if (existingUser.facebookId) {
          return res.json('Login with Facebook');
        } else if (existingUser.twitterId) {
          return res.json('Login with Twitter');
        } else {
          return res.json('User with this email already exists');
        }
      } else {
        try {
          //salt password
          const salt = await bcrypt.genSalt(10);
          if (!salt) throw Error('Something went wrong with bcrypt');

          const hash = await bcrypt.hash(password, salt);
          if (!hash) throw Error('Something went wrong hashing the password');

          ///Create user and save to database
          let newuser = await user.create({email, password: hash, watchlist: 0, stock: 'AAPL'});
          let newWatchlist = await (await watchlist.create({title: 'My Watchlist', body: ["AAPL", "TSLA", "MSFT"], _user: newuser._id})).save();
          let t = token.signToken(newuser._id);
          await newuser.save()
          res.cookie('access_token', t, { httpOnly: true });
          res.send({...req.user, cookie: t})
          next();
        } catch (e) {
          console.log(e);
          res.status(400).send('Bad request');
        }
      }
    },
    ////Log user into app and redirect to localhost:3000
    // passport.authenticate('local', { failureRedirect: '/register' }),
    // (req, res) => {
      // if (req.isAuthenticated()) {
  );

  //login
  app.post(
    '/auth/login',
    async (req, res, next) => {
      const {email, password} = req.body
      ///check if user exists
      try {
        const existingUser = await user.findOne({ email });
        if(!existingUser) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) throw Error('Invalid credentials');

        let t = token.signToken(existingUser._id);
        if(!t) throw Error('Invalid Credentials')
        console.log('cookie:' + t),
        res.cookie('access_token', t, { httpOnly: true }),
        res.json({...existingUser, cookie: t}),
        
        next()
      } catch (e) {
        console.log(e);
        res.status(400).send('Password does not Match');
      }
    })
  //     ///check if user signed in using oauth
  //     if (existingUser) {
  //       if (existingUser.googleId) {
  //         return res.json('Login with Google');
  //       } 
  //       if (existingUser.facebookId) {
  //         return res.json('Login with Facebook');
  //       } 
  //       if (existingUser.twitterId) {
  //         return res.json('Login with Twitter');
  //       } 
  //     }
  //     try {
  //       ///create token for user
        // let t = token.signToken(existingUser._id);
        // res.cookie('access_token', t, { httpOnly: true });
  //       next();
  //     } catch (e) {
  //       console.log(e);
  //       res.status(400).send('Bad request');
  //     }
      
    
  //   ////Login user and redirect to localhost:3000
  //   passport.authenticate('local', { failureRedirect: '/register' }),
  //   (req, res) => {
  //     if (req.isAuthenticated()) {
  //       const { _id } = req.user;
  //       const t = token.signToken(_id);
  //       res.cookie('access_token', t, { httpOnly: true });
  //       if (req.user.plan == 1) {
  //         res.redirect(keys.redirectDomainTrial);
  //       } else {
  //         res.redirect(keys.redirectDomain);
  //       }
  //     }
  //   }
  // }
  // );

  //google
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      if (req.isAuthenticated()) {
        console.log(req)
        const { _id } = req.user;
        const t = token.signToken(_id);
        const plan = req.user.plan;
        res.cookie('access_token', t, { httpOnly: false });
        if (plan == 1) {
          res.redirect(`${keys.redirectDomainTrial}`);//?access_token=${t}?
        } else {
          res.redirect(`${keys.redirectDomain}`);//?access_token=${t}?
        }
      }
    }
  );

  //facebook
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: false });
        if (req.user.plan == 1) {
          res.redirect(`${keys.redirectDomainTrial}`);//?access_token=${t}?
        } else {
          res.redirect(`${keys.redirectDomain}`);//?access_token=${t}?
        }
      }
    }
  );

  //twitter
  app.get(
    '/auth/twitter',
    passport.authenticate('twitter', { scope: ['email'] })
  );

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: false });
        if (req.user.plan == 1) {
          res.redirect(`${keys.redirectDomainTrial}`);//?access_token=${t}?
        } else {
          res.redirect(`${keys.redirectDomain}`);//?access_token=${t}?
        }
      }
    }
  );

  //other
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(keys.redirectDomainLogout);
  });

  app.get('/api/current_user', requireLogin, async (req, res) => {
    // console.log(req.user)
    // res.json(req.user);
    try {
      console.log(req.user)
      const existinguser = await user.findById(req.user.sub).select('-password')
      if(!existinguser) throw Error('user does not exist')
      console.log(existinguser)
      res.json(existinguser)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
  });


  ///Update Selected Watchlist
  app.get('/api/selectNewWatchlist', requireLogin, async (req, res) => {
    const sub = req.user.sub;
    try {
      const userLists = await watchlist.find({_user: sub})
      if(!userLists) res.send('Create a watchlist')
      const lists = [...userLists]
      //convert
      var result = {};
      for (var i = 0; i < lists.length; i++) {
          result[lists[i].title] = lists[i].body;
      }
      const list = Object.keys(result)
      const existingUser = await user.updateOne({_id: sub}, {$set:{watchlist: list.length}})
      const Number = await user.findOne({_id: sub})
      res.send(Number)
    } catch (err) {
      res.status(400).json({msg: err.message})
    }
  })

  
};
