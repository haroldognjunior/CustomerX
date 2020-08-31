const server = require("express").Router();
const { Clients } = require("../models/index.js");

server.get("/", (req, res) => {
  Clients.findAll({
    order: [["idClient", "ASC"]],
  }).then((result) => {
    res.send(result);
  });
});

server.get("/:idClient", (req, res) => {
  const { idClient } = req.params;
  Clients.findOne({
    where: { idClient: idClient },
  }).then((result) => {
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

server.post('/new', function(req, res) {
  Clients.create({
          fullName:req.body.fullName,
          email1:req.body.email1,
          email2:req.body.email2,
          phone1:req.body.phone1,
          phone2:req.body.phone2,
          registrationDate: req.body.registrationDate,
          
          
      })
      .then(() => {
          return res.send('Usuário criado')
      })
      .catch(() => {
          return res.status(400).send('Já existe o usuário')
      })
});

//Edita un Usuario por ID
server.put("/modify/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Clients.findOne({
    where: {
      id: id,
    },
  });
  
  if (user === null) {
    res.status(404).send({
      status: `No se ha encontrado al Usuario especificado. Contacte a su Administrador`,
    });
  } else {
    const {
      fullName,
      email1,
      email2,
      phone1,
      phone2,
      registrationDate     
    } = req.body;
    Clients.update(
      {
      fullName,
      email1,
      email2,
      phone1,
      phone2,
      registrationDate
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        res.send({
          status: `Sus datos ${user.name} han sido validados correctamente`,
        });
      })
      .catch((err) => {
        if (err.original) res.send(err.original.messageDetail);
        else res.send("Error de validación de datos");
      });
  }
});

//Elimina um cliente pela ID
server.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await Clients.findOne({
    where: {
      id,
    }    
  });
  if (user === null) {
    res.status(404).send({
      status: `Nao encontrou o usuário específico. Contate o Administrador`,
    });
  } else {
      await Clients.destroy({
        where: {
          id,
        },
      })
        .then(() => {
          res.send({
            status: `O usuário ${user.email} foi eliminado corretamente`,
          });
        })
        .catch((err) => {
          if (err.original) res.send(err.original.messageDetail);
          else res.send("Erro na validacao dos dados");
        });
    }
  
});



module.exports = server;
