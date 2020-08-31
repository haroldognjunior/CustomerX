"use strict";

var express = require('express');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var routes = require('./routes/index.js');

var morgan = require('morgan');

var server = express();

var passport = require('passport');

var session = require('express-session');

require('./models');

server.name = 'API'; // For Passport

server.use(session({
  name: "Conectado",
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret

server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions
//load passport strategies

require('./passport.js')(passport);

server.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
server.use(bodyParser.json({
  limit: '50mb'
}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.use('/', routes); // Error catching endware.

server.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  var status = err.status || 500;
  var message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
module.exports = server;