const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth-routes');
require('./config/passport-setup');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

//create home route
app.get('/', (req, res) => {
  res.render('home');
});

//setup routes
app.use('/auth', authRoutes);

app.listen('3000', () => {
  console.log('Listening for app on port 3000');
});
