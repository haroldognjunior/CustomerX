const fs = require("fs");
const path = require("path");
const db = require("../db.js");
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const models = {};

models.conn = db();

fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = models.conn.import(path.join(__dirname, file));
        const name = file.split('.')[0];
        models[name] = model;
    });

    const {
            Clients = require('./Clients.js'),                       
            Contact = require('./Contact.js'),
            Users = require('./Users.js')
            
    } = models

db.Sequelize = Sequelize;

Clients.hasMany(Contact);




module.exports = models;
