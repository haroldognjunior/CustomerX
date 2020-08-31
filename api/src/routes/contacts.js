const { Router } = require("express");
const server = require("express").Router();
const router = Router();
const { Op } = require("sequelize");
const { Clients, Contact } = require("../models/index.js");

//Listar todos os contatos

server.get('/', function(req, res) {
    Contact.findAll()
        .then(function(message) {
            return res.status(200).send(message); 
        });
});

//Listar todos os contatos de um determinado cliente

server.get('/:id', function(req, res) {

    Contact.findAll({
        where: {
            clientIdClient: req.params.id,
        }
    }).then(function(contact) {       
        return res.status(200).send(contact)
    })
    .catch(() => {
        return res.status(404).send('Não foi possível encontrar os contatos')
    })
})

server.post('/:idClient', function(req, res) {

    var contact = function(){
        return Contact.create({
            fullName: req.body.fullName,           
            email1:req.body.email1,
            email2:req.body.email2,
            phone1:req.body.phone1,
            phone2:req.body.phone2
            
        })
    }

    var client = function() {
        return Clients.findOne({
            where: {
                idClient: req.params.idClient
            }
        })
    }

    Promise.all([contact(), client()]).then((response) => {
        if (response[0] && response[1]) {
            response[1].addContacts(response[0]);
            return res.send('Contato incluído com sucesso');
        } else {
            return res.send('Contato não incluído')
        }
    })    
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



server.delete('/:idUser/deleteContact/:email', (req,res) => {
    const idUser =  req.params.idUser;
    const email = req.params.email;

    //busco usuario y usuario a borrar
    let usuario = Clients.findByPk(idUser)
    let deleteado = Clients.findOne({where: {email: email}})
    
    Promise.all([usuario,deleteado])
        .then(users=>{
            var contacts = users[0].contacts;
            //creo un nuevo array donde NO exista el id del usuario que quiero borrar
            const newContacts = contacts.filter(idUsers =>  idUsers != users[1].id)
            //modifico el array de contactos con el nuevo array que excluyó el id a eliminar
            Clients.update({
                contacts: newContacts
            },{
                returning: true, where: {id: users[0].id}
            })
            .then(userUpdated=>{
                res.status(200).send(userUpdated);
            })
        })
        .catch(err => { res.status(400).send(err)});
})

module.exports = server;