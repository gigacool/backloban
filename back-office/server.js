
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
  var PORT, compress, express, server;

  PORT = process.env.PORT || 3000;

  express = require('express');

  compress = require('compression')();

  server = express();

  server.use(compress);

  server.use('/', express['static']('./front-office'), {
    maxAge: 86400000
  });

  console.log('Starting server on port', PORT);

  server.listen(PORT);

}).call(this);
