"use strict";

var server = require("./src/app.js");

var _require = require("./src/models/index.js"),
    conn = _require.conn; // Syncing all the models at once.


conn.sync({
  force: false
}).then(function () {
  server.listen(3001, function () {
    console.log('Conectado at 3001'); // eslint-disable-line no-console
  });
});