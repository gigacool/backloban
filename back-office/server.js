
/*
  the node server back-office is meant to be a REST API. First draft:
  concepts / urls
  * products (CREATE, READ, UPDATE, DELETE)
  * products/{id}/backlog-items (CREATE, READ, UPDATE, DELETE)
  * products/{id}/backlog-items/{item-id}/tasks (CREATE, READ, UPDATE, DELETE)

  That should do for now.

  concerns with performance
  * think about optimizations (gzip, etc.)
  * test performance
  * assess product/backlog/items scalability wrt. performance
 */

(function() {
  var PORT, bodyParser, compress, express, fs, products, server;

  PORT = process.env.PORT || 3000;

  express = require('express');

  compress = require('compression')();

  bodyParser = require('body-parser');

  fs = require('fs');

  console.log('setup express server');

  server = express();

  server.use(compress);

  server.use(bodyParser());

  server.use(bodyParser.json({
    type: 'application/vnd.api+json'
  }));

  server.use('/', express['static']('./front-office'), {
    maxAge: 86400000
  });

  console.log('setup available server urls');

  products = require('./models/Products');

  server.get('/REST/products', products.get);

  server.post('/REST/products', products.add);

  server.put('/REST/products/:id', products.update);

  server["delete"]('/REST/products/:id', products["delete"]);

  console.log('Starting server on port', PORT);

  server.listen(PORT);

}).call(this);
