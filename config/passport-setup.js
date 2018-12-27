const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');


passport.use(
  new GoogleStrategy({
  //options for the google strategy
  callbackURL: process.env.CALLBACK_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  //passport callback function
  console.log('passport callback fired');
  console.log(profile);
  new User({
    username: profile.displayName,
    googleID: profile.id
    }).save().then((newUser) => {
      console.log(`new user was created ${newUser}`);
    });
  })
)