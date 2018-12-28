const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
require('./config/passport-setup');

const port = process.env.PORT || 3000;


const app = express();

//setup view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, () => {
  console.log(`connected to mongoDB`);
});

//create home route
app.get('/', (req, res) => {
  res.render('home');
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => {
  console.log('Listening for requests');
});
