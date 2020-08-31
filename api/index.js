const server = require("./src/app.js");
const { conn } = require("./src/models/index.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('Conectado at 3001'); // eslint-disable-line no-console
  });
});