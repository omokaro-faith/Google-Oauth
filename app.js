const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth-routes');
require('./config/passport-setup');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

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

app.listen('3000', () => {
  console.log('Listening for requests on port 3000');
});
