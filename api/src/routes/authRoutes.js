/** @format */

const token = require('../services/jwt')
const passport = require('passport');
const user = require('../models/User');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  //test route
  app.get('/dashboard', async (req, res) => {
    console.log('go to dashboard');
  });
  //local
  app.post('/auth/register', async (req, res, next) => {
      const existingUser = await user.findOne({
      email: req.body.email,
    });
    // console.log(existingUser);
    if (existingUser) {
      if (existingUser.googleId) {
        // console.log('Login with google');
        return res.json('Login with Google');
        //return res.json('Login with Google');
      } else if (existingUser.facebookId) {
        // console.log('Login with facebook');
        return res.json('Login with Facebook');
      } else if (existingUser.twitterId) {
        // console.log('Login with twitter');
        return res.json('Login with Twitter');
      } else {
        return res.json('User with this email already exists');
        // console.log('User with this email already exists');
      }
      // console.log(existingUser.googleId);
      // console.log(existingUser.facebookId);
      // console.log("User with this email already exists");
      // return done(null, existingUser);
    } else {
      try {
        let newuser = await user.create(req.body);
        let t = token.signToken(newuser._id)
        res.cookie('access_token', t, { httpOnly: true});
        next()
      } catch (e) {
        console.log(e);
        res.status(400).send('Bad request')
      }
      // console.log("not working");
    }
  },
    passport.authenticate('local', { failureRedirect: '/register' }),
    (req, res) => {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true});
        res.send('OK')
      }
    });

  // // //local
  // app.post(
  //   '/auth/local',
  //   passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/register',
  //     failureFlash: true,
  //   }),
  //   (req, res) => {
  //     console.log(req.body);
  //     // res.redirect('/');
  //   }
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
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true});
        res.redirect(keys.redirectDomain);
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
        res.cookie('access_token', t, { httpOnly: true});
        res.redirect(keys.redirectDomain);
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
        res.cookie('access_token', t, { httpOnly: true});
        res.redirect(keys.redirectDomain);
      }
    }
  );

  //other
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/register');
  });

  app.get('/api/current_user', requireLogin, (req, res) => {
    res.send(req.user);
  });

};
