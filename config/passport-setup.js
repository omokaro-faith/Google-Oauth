const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy({
  //options for the google strategy
  callbackURL: process.env.CALLBACK_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  //check if user already exists in our db
  User.findOne({googleID: profile.id}).then((currentUser) => {
    if(currentUser) {
      //already have the user
      console.log(`user is ${currentUser}`)
      done(null, currentUser);
    }else {
      //if not, create user in our db
      new User({
        username: profile.displayName,
        googleID: profile.id
        }).save().then((newUser) => {
          console.log(`new user was created ${newUser}`);
          done(null, newUser);
          });
        }
      });
    })
  )
