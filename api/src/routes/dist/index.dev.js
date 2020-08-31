"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var passport = require("passport");

var session = require("express-session"); // import all routers;


var authPath = require("./auth.js");

var usersPath = require("./users.js");

var contactsPath = require("./contacts.js");

var clientsPath = require("./clients.js");

router.use("/auth", authPath);
router.use("/users", usersPath);
router.use("/contacts", contactsPath);
router.use("/clients", clientsPath);
module.exports = router;