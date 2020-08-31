"use strict";

var fs = require("fs");

var path = require("path");

var db = require("../db.js");

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var basename = path.basename(__filename);
var models = {};
models.conn = db();
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = models.conn["import"](path.join(__dirname, file));
  var name = file.split('.')[0];
  models[name] = model;
});
var _models$Clients = models.Clients,
    Clients = _models$Clients === void 0 ? require('./Clients.js') : _models$Clients,
    _models$Contact = models.Contact,
    Contact = _models$Contact === void 0 ? require('./Contact.js') : _models$Contact,
    _models$Users = models.Users,
    Users = _models$Users === void 0 ? require('./Users.js') : _models$Users;
db.Sequelize = Sequelize;
Clients.hasMany(Contact);
module.exports = models;