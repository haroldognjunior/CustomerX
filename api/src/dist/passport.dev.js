"use strict";

var _require = require("./models/index.js"),
    Users = _require.Users;

var PassportLocal = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(new PassportLocal({
    usernameField: 'email',
    passwordField: 'password'
  }, function (username, password, done) {
    Users.findOne({
      where: {
        email: username
      }
    }).then(function (user) {
      if (user === null) {
        return done(null, false, {
          message: "El usuario no existe"
        });
      }

      if (user.password !== password) {
        return done(null, false, {
          message: "Contraseña incorrecta"
        });
      }

      return done(null, user);
    })["catch"](function (err) {
      done(err);
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    Users.findByPk(id).then(function (user) {
      done(null, user);
    })["catch"](function (err) {
      done(err);
    });
  });
};