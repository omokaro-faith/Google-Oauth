const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');


passport.use(
  new GoogleStrategy({
  //options for the google strategy
  callbackURL: process.env.CALLBACK_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, () => {
  //passport callback function
  })
)