const server = require("express").Router();
const { Users } = require("../models/index.js");

server.get("/", (req, res) => {
  Users.findAll({
    order: [["id", "ASC"]],
  }).then((result) => {
    res.send(result);
  });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: { id: id },
  }).then((result) => {
    res.send(result);
  });
});





module.exports = server;
