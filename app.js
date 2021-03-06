const fs = require("fs");
const path = require('path');

const express = require("express");
const morgan = require("morgan");

const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

//CREATE EXPRESS APP
const app = express();

//MIDDLEWARE
//console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'developement'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next)=>{
   console.log('hello from middleware');
   next();
})
app.use((req, res, next)=>{
  req.requestTime = new Date().toISOString();
  next();
})



//ROUTES
app.use(tourRoutes);
app.use(userRoutes);

module.exports = app;