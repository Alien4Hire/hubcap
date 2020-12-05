/** @format */

const passport = require('passport');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { rest } = require('lodash');
const cookieSession = require('cookie-session');
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) => {
  //test route
  app.get('/dashboard', async (req, res) => {
    console.log('go to dashboard');
  });

  //local
  app.post('/auth/register', async (req, res) => {
    // console.log(req.body.password);
    // console.log(req.body.email);

    const existingUser = await user.findOne({
      email: req.body.email,
    });

    // console.log(existingUser);

    if (existingUser) {
      if (existingUser.googleId) {
        // console.log('Login with google');
        return res.json('Login with Google');
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
        console.log(req);
        let newuser = await user.create(req.body);

        let token = jwt.sign({ userid: newuser.id }, keys.cookieKey);
        res.json({ token });
      } catch (e) {
        console.log(e);
      }
      // console.log("not working");
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
      res.redirect('/');
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
      console.log(user);
      res.redirect('/');
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
