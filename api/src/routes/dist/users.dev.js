"use strict";

var server = require("express").Router();

var bcrypt = require("bcrypt");

var _require = require("../models/index.js"),
    Users = _require.Users;

server.get("/", function (req, res) {
  Users.findAll({
    order: [["id", "ASC"]]
  }).then(function (result) {
    res.send(result);
  });
});
server.get("/:id", function (req, res) {
  var id = req.params.id;
  Users.findOne({
    where: {
      id: id
    }
  }).then(function (result) {
    res.send(result);
  });
});
/* server.post("/new", async (req, res) => {
  const {
    email,
    password,    
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  Users.create({
    email,
    password: hashedPassword,
   
  })
    .then((user) => {
    
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (err.original) res.send(err.original.messageDetail);
      else res.send("Error de validación de datos");
      //res.status(500).json({ err });
    });
}); */
//Edita un Usuario por ID

server.put("/modify/:id", function _callee(req, res) {
  var id, user, _req$body, firstName, lastName, identification, phone, birthDate, street, city, country, complemento;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Users.findOne({
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
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, identification = _req$body.identification, phone = _req$body.phone, birthDate = _req$body.birthDate, street = _req$body.street, city = _req$body.city, country = _req$body.country, complemento = _req$body.complemento;
            Users.update({
              firstName: firstName,
              lastName: lastName,
              identification: identification,
              phone: phone,
              birthDate: birthDate,
              street: street,
              city: city,
              country: country,
              complemento: complemento
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
}); //Elimina un Usuario por ID

server["delete"]("/delete/:id", function _callee2(req, res, next) {
  var id, user, balance;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Users.findOne({
            where: {
              id: id
            },
            include: [{
              model: Wallet,
              as: "wallet"
            }]
          }));

        case 3:
          user = _context2.sent;

          if (!(user === null)) {
            _context2.next = 8;
            break;
          }

          res.status(404).send({
            status: "No se ha encontrado al Usuario especificado. Contacte a su Administrador"
          });
          _context2.next = 15;
          break;

        case 8:
          balance = parseFloat(user.wallet.balance);

          if (!(balance > 0)) {
            _context2.next = 13;
            break;
          }

          res.send({
            status: "El Usuario ".concat(user.email, " no se puede eliminar; a\xFAn tiene un saldo de ").concat(balance, " en su cuenta")
          });
          _context2.next = 15;
          break;

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(Users.destroy({
            where: {
              id: id
            }
          }).then(function () {
            res.send({
              status: "El Usuario ".concat(user.email, " ha sido eliminado correctamente")
            });
          })["catch"](function (err) {
            if (err.original) res.send(err.original.messageDetail);else res.send("Error de validación de datos");
          }));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = server;