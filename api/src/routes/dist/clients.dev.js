"use strict";

var server = require("express").Router();

var _require = require("../models/index.js"),
    Clients = _require.Clients;

server.get("/", function (req, res) {
  Clients.findAll({
    order: [["id", "ASC"]]
  }).then(function (result) {
    res.send(result);
  });
});
server.get("/:id", function (req, res) {
  var id = req.params.id;
  Clients.findOne({
    where: {
      id: id
    }
  }).then(function (result) {
    res.send(result);
  });
});
/* server.post("/new", async (req, res) => {
  const {
    fullName,
    email1,
    email2,
    phone1,
    phone2,
    registrationDate, 
  } = req.body;
    Clients.create({
    fullName,
    email1,
    email2,
    phone1,
    phone2,
    registrationDate, 
  })
    .then((user) => {
      
      return res.send(user);
    })
    .catch((err) => {
      if (err.original) res.send(err.original.messageDetail);
      else res.send("Error de validación de datos");
      //res.status(500).json({ err });
    });
}); */

server.post('/new', function (req, res) {
  Clients.create({
    fullName: req.body.fullName,
    email1: req.body.email1,
    email2: req.body.email2,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    registrationDate: req.body.registrationDate
  }).then(function () {
    return res.send('Usuário criado');
  })["catch"](function () {
    return res.status(400).send('Já existe o usuário');
  });
}); //Edita un Usuario por ID

server.put("/modify/:id", function _callee(req, res) {
  var id, user, _req$body, fullName, email1, email2, phone1, phone2, registrationDate;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Clients.findOne({
            where: {
              id: id
            }
          }));

        case 3:
          user = _context.sent;

          if (user === null) {
            res.status(404).send({
              status: "No se ha encontrado al Usuario especificado. Contacte a su Administrador"
            });
          } else {
            _req$body = req.body, fullName = _req$body.fullName, email1 = _req$body.email1, email2 = _req$body.email2, phone1 = _req$body.phone1, phone2 = _req$body.phone2, registrationDate = _req$body.registrationDate;
            Clients.update({
              fullName: fullName,
              email1: email1,
              email2: email2,
              phone1: phone1,
              phone2: phone2,
              registrationDate: registrationDate
            }, {
              where: {
                id: id
              }
            }).then(function () {
              res.send({
                status: "Sus datos ".concat(user.name, " han sido validados correctamente")
              });
            })["catch"](function (err) {
              if (err.original) res.send(err.original.messageDetail);else res.send("Error de validación de datos");
            });
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Elimina um cliente pela ID

server["delete"]("/delete/:id", function _callee2(req, res, next) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Clients.findOne({
            where: {
              id: id
            }
          }));

        case 3:
          user = _context2.sent;

          if (!(user === null)) {
            _context2.next = 8;
            break;
          }

          res.status(404).send({
            status: "Nao encontrou o usu\xE1rio espec\xEDfico. Contate o Administrador"
          });
          _context2.next = 10;
          break;

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Clients.destroy({
            where: {
              id: id
            }
          }).then(function () {
            res.send({
              status: "O usu\xE1rio ".concat(user.email, " foi eliminado corretamente")
            });
          })["catch"](function (err) {
            if (err.original) res.send(err.original.messageDetail);else res.send("Erro na validacao dos dados");
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = server;