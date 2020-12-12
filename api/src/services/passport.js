/** @format */

const passport = require('passport');
require('passport-oauth2');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const generator = require('generate-password');

const jwt = require('jsonwebtoken');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
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
      const existingUser = await User.findOne({
        // googleId: profile.id,
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
          googleId: profile.id,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          password: generator.generate({ length: 10, numbers: true }),
        }).save();

        // try {
        //   let newuser = { email: user.email, password: user.password };
        //   let token = jwt.sign({ userid: newuser.id }, keys.cookieKey);
        //   res.json({ token });
        // } catch (e) {
        //   console.log(e);
        // }
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
      // const existingEmail = await User.findOne({ email: profile.email });
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
        // console.log(profile.id);
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

// //user register
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     function (email, password, done) {
//       const existingUser = User.findOne({ email: email });
//       if (existingUser) {
//         if (existingUser.googleId) {
//           // verify password
//           return done(null, false, { message: 'Login using Google' });
//         } else if (existingUser.facebookId) {
//           return done(null, false, { message: 'Login using Facebook' });
//         } else if (existingUser.twitterId) {
//           return done(null, false, { message: 'Login using Twitter' });
//         } else {
//           return done(null, existingUser);
//         }
//       } else {
//         console.log(email);
//         const user = new User({
//           localId: generator.generate({ length: 10, numbers: true }),
//           email: email,
//           password: password,
//         }).save();
//         done(null, user);
//       }
//     }
//   )
// );

// passport.use(
//   'jwt',
//   new JWTstrategy(opts, (jwt_payload, done) => {
//     try {
//       User.findOne({
//         where: {
//           username: jwt_payload.id,
//         },
//       }).then((user) => {
//         if (user) {
//           console.log('user found in db in passport');
//           // note the return removed with passport JWT - add this return for passport local
//           done(null, user);
//         } else {
//           console.log('user not found in db');
//           done(null, false);
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   })
// );
// //tutorial jwt.strategy
// const cookieExtractor = req => {
//   let token = null;
//   if(req && req.cookies){
//     token = req.cookies["access_token"];
//   }
//   return token;
// };
// //authorization
// passport.use(new JwtStrategy({
//   jwtFromRequest: cookieExtractor,
//   secretOrKey: keys.cookieKey
// },(payload,done)=>{
//   User.findById({_id: payload.sub}, (err,user)=>{
//     if(err)
//       return done(err,false);
//     if(user)
//       return done(null,user);
//     else
//       return done(null,false);
//   })
// }));
// //^^
