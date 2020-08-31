"use strict";

var _require = require("express"),
    Router = _require.Router;

var server = require("express").Router();

var router = Router();

var _require2 = require("sequelize"),
    Op = _require2.Op;

var _require3 = require("../models/index.js"),
    Clients = _require3.Clients,
    Contact = _require3.Contact; //Ruta para traer contactos de un usuario


server.get("/:idUser", function (req, res) {
  var idUser = req.params.idUser; //busco el usuario por id

  Clients.findByPk(idUser).then(function (user) {
    var contacts = user.contacts;

    if (contacts.length != 0) {
      var promesas = contacts.map(function (c) {
        return Clients.findByPk(c);
      });
      Promise.all(promesas).then(function (contactos) {
        res.status(200).json({
          contactos: contactos
        });
      });
    } else {
      res.status(404).json({
        message: "No se tiene contactos aúnnnnnnnn"
      });
    }
  })["catch"](function (err) {
    return res.status(400).json({
      err: err
    });
  });
});
server.post('/:idClient', function (req, res) {
  var contact = function contact() {
    return Contact.create({
      fullName: req.body.fullName,
      email1: req.body.email1,
      email2: req.body.email2,
      phone1: req.body.phone1,
      phone2: req.body.phone2
    });
  };

  var client = function client() {
    return Clients.findOne({
      where: {
        idClient: req.params.idClient
      }
    });
  };

  Promise.all([contact(), client()]).then(function (response) {
    if (response[0] && response[1]) {
      response[1].addContacts(response[0]);
      return res.send('Post publicado com sucesso');
    } else {
      return res.send('Post não publicado');
    }
  });
});
/* server.post('/:id/contact', function(req, res) {
    Contact.create({
            fullName: req.body.fullName,           
            email1:req.body.email1,
            email2:req.body.email2,
            phone1:req.body.phone1,
            phone2:req.body.phone2,
            clientId:req.params.clientId 
        })
        .then(() => {
            return res.send('Seu comentário foi adicionado')
        })
        .catch(() => {
            return res.status(400).send('Não foi possível adicionar o seu comentário')
        })
}); 
 */

/* server.post('/:idUser/addContact', (req,res)=> {

    const idUser =  req.params.idUser;
    const email = req.body.email;

    //busco usuario y usuario a agregar
    let usuario = Clients.findByPk(idUser)
    let agregado = Clients.findOne({where: {email1: email}})
    

    Promise.all([usuario,agregado])
        .then(users=>{
            var contacts = users[0].contacts;
            //pusheo en el array de contactos el id del contacto a agregar
            contacts.push(users[1].id)

            //updateo el array con el nuevo array que creé
            Clients.update({
                contacts: contacts
            },{
                returning: true, where: {id: users[0].id}
            })
            .then(userUpdated=>{
                res.status(200).send(userUpdated);
            })
        })
        .catch(err => { res.status(400).send(err); });
}) */

server["delete"]('/:idUser/deleteContact/:email', function (req, res) {
  var idUser = req.params.idUser;
  var email = req.params.email; //busco usuario y usuario a borrar

  var usuario = Clients.findByPk(idUser);
  var deleteado = Clients.findOne({
    where: {
      email: email
    }
  });
  Promise.all([usuario, deleteado]).then(function (users) {
    var contacts = users[0].contacts; //creo un nuevo array donde NO exista el id del usuario que quiero borrar

    var newContacts = contacts.filter(function (idUsers) {
      return idUsers != users[1].id;
    }); //modifico el array de contactos con el nuevo array que excluyó el id a eliminar

    Clients.update({
      contacts: newContacts
    }, {
      returning: true,
      where: {
        id: users[0].id
      }
    }).then(function (userUpdated) {
      res.status(200).send(userUpdated);
    });
  })["catch"](function (err) {
    res.status(400).send(err);
  });
});
module.exports = server;