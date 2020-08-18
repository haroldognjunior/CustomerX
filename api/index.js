var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;

app.listen(port);

console.log('Servidor rodando no porto: ' + port);