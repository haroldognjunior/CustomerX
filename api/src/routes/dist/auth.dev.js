"use strict";

var server = require("express").Router();

var passport = require("passport");

var _require = require("../models/index.js"),
    Users = _require.Users;

var bcrypt = require("bcrypt");

server.post("/changepassword"); //fazer login

server.post('/login', passport.authenticate('local'), function (req, res) {
  res.json(req.user);
});
server.get('/login', function (req, res) {
  res.json(req.user);
}); //fazer logout

server.get("/logout", function (req, res, next) {
  req.logout();
  req.session = null;
  res.sendStatus(200);
}); //criar um usuário

server.post('/register', function (req, res) {
  Users.create({
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password
  }).then(function () {
    return res.send('Usuário criado');
  })["catch"](function () {
    return res.status(400).send('Já existe o usuário');
  });
}); //traz infos do perfil do usuário

server.get("/me");
server.get("/profileuser", function (req, res) {
  Users.findOne({
    where: {
      id: req.user.id
    }
  }).then(function (result) {
    if (result === null) {
      res.send("usuário não encontrado");
    } else {
      res.send(result);
    }
  });
});

function isLoggedIn(req, res, next) {
  // console.log("###### Parámetro req del isLoggedIn ######");
  // console.log(req);
  if (req.isAuthenticated()) {
    console.log("###### Propiedad session del isLoggedIn ######");
    console.log(req.session);
    var user = {
      id: req.session.passport.user,
      isLoggedIn: req.isAuthenticated()
    };
    console.log("###### Variable user del isLoggedIn ######");
    console.log(user);
    return next();
  }

  res.redirect("/login");
}

module.exports = server;