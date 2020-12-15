/** @format */

const passport = require('passport');
require('passport-oauth2');
const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const generator = require('generate-password');

const jwt = require('jsonwebtoken');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('user serialized');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    console.log('user deserialized');
    done(null, user);
  });
});

//google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      ///Check if user email exists
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      ///if exists assume oauth secure allow login
      if (existingUser) {
        if (existingUser.googleId) {
          return done(null, existingUser);
        } else if (existingUser.facebookId) {
          return done(null, existingUser);
        } else if (existingUser.twitterId) {
          return done(null, existingUser);
        } else {
          return done(null, existingUser);
        }
      } else {
        ///create user and save
        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          password: generator.generate({ length: 10, numbers: true }),
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      proxy: true,
      profileFields: ['email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        if (existingUser.googleId) {
          return done(null, existingUser);
        } else if (existingUser.facebookId) {
          return done(null, existingUser);
        } else if (existingUser.twitterId) {
          return done(null, existingUser);
        } else {
          return done(null, existingUser);
        }
      } else {
        const user = await new User({
          facebookId: profile.id,
          email: profile.emails[0].value,
          // profilePic: profile.photos[0].value,
          password: generator.generate({ length: 10, numbers: true }),
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/twitter/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value,
      });
      if (existingUser) {
        if (existingUser.googleId) {
          return done(null, existingUser);
        } else if (existingUser.facebookId) {
          return done(null, existingUser);
        } else if (existingUser.twitterId) {
          return done(null, existingUser);
        } else {
          return done(null, existingUser);
        }
      } else {
        const user = await new User({
          twitterId: profile.id,
          email: profile.emails[0].value,
          // profilePic: profile.photos[0].value,
          password: generator.generate({ length: 10, numbers: true }),
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user)
          return done(null, false, { message: 'Incorrect email or password' });

        user.comparePassword(password, (err) => {
          if (err) {
            return done(null, false, {
              message: 'Incorrect email or password',
            });
          } else {
            return done(null, user);
          }
        });
      });
    }
  )
);
