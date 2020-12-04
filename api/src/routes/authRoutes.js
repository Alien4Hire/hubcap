/** @format */

const passport = require('passport');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { rest } = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) => {
  //test route
  app.get('/dashboard', async (req, res) => {
    console.log('go to dashboard');
  });

  //local
  app.post('/auth/register', async (req, res) => {
    const existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      if (existingUser.googleId) {
        console.log('Login with google');
        return 'Login with Google';
      } else if (existingUser.facebookId) {
        console.log('Login with facebook');
        return res.redirect('/auth/facebook');
      } else if (existingUser.twitterId) {
        console.log('Login with twitter');
        return res.redirect('/auth/twitter');
      } else {
        console.log('User with this email already exists');
      }
    } else {
      try {
        let newuser = await user.create(req.body);
        let token = jwt.sign({ userid: newuser.id }, keys.cookieKey);
        res.json({ token });
      } catch (e) {
        console.log(e);
      }
      console.log(req.body);
    }
  });

  //local
  app.post(
    '/auth/local',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

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
    (req, res) => {
      res.redirect('/dashboard');
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
      // Successful authentication, redirect home.
      res.redirect('/');
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
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  //other
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/register');
  });

  app.get('/api/current_user', requireLogin, (req, res) => {
    res.json(req.user);
  });
};
