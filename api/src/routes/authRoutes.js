/** @format */

const token = require('../services/jwt');
const passport = require('passport');
const user = require('../models/User');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const cors = require('cors');

module.exports = (app) => {
  //local
  app.post(
    '/auth/register',
    async (req, res, next) => {
      //find user by email, if exists tell user to login
      const existingUser = await user.findOne({
        email: req.body.email,
      });
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
          ///Create user and save to database
          let newuser = await user.create(req.body);
          let t = token.signToken(newuser._id);
          res.cookie('access_token', t, { httpOnly: true });
          next();
        } catch (e) {
          console.log(e);
          res.status(400).send('Bad request');
        }
      }
    },
    ////Log user into app and redirect to localhost:3000
    passport.authenticate('local', { failureRedirect: '/register' }),
    (req, res) => {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true });
        if (req.user.plan == 1) {
          res.redirect(keys.redirectDomainTrial);
        } else {
          res.redirect(keys.redirectDomain);
        }
      }
    }
  );

  //login
  app.post(
    '/auth/login',
    passport.authenticate('local', { failureRedirect: '/login-fail' }),
    (req, res) => {
      if (req.isAuthenticated()) {
        req.login(req.user, (err) => {
          if(err){
            console.warn(err)
            res.status(403).send()
          }
        })

        const { _id } = req.user;
        console.log(req.user._id, 'AUTHENTICATED')
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true });
        if (req.user.plan == 1) {
          res.redirect(keys.redirectDomainTrial);
        } else {
          res.redirect(keys.redirectDomain);
        }
      }
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
    function (req, res) {
      if (req.isAuthenticated()) {
        const { _id } = req.user;
        const t = token.signToken(_id);
        res.cookie('access_token', t, { httpOnly: true });
        if (req.user.plan == 1) {
          res.redirect(keys.redirectDomainTrial);
        } else {
          res.redirect(keys.redirectDomain);
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
        res.cookie('access_token', t, { httpOnly: true });
        if (req.user.plan == 1) {
          res.redirect(keys.redirectDomainTrial);
        } else {
          res.redirect(keys.redirectDomain);
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
        res.cookie('access_token', t, { httpOnly: true });
        if (req.user.plan == 1) {
          res.redirect(keys.redirectDomainTrial);
        } else {
          res.redirect(keys.redirectDomain);
        }
      }
    }
  );

  //other
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect(keys.redirectDomainLogout);
  });

  app.get('/api/current_user', requireLogin, (req, res) => {
    res.send(req.user);
  });
};
