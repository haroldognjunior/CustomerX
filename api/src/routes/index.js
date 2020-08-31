const { Router } = require("express");
const router = Router();
const passport = require("passport");
const session = require("express-session");

// import all routers;
const authPath = require("./auth.js");
const usersPath = require("./users.js");
const contactsPath = require("./contacts.js");
const clientsPath = require("./clients.js");


router.use("/auth", authPath);
router.use("/users", usersPath);
router.use("/contacts", contactsPath);
router.use("/clients", clientsPath);




module.exports = router;