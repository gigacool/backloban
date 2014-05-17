
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
  var PORT, compress, express, fs, products, server;

  PORT = process.env.PORT || 3000;

  express = require('express');

  compress = require('compression')();

  fs = require('fs');

  products = JSON.parse(fs.readFileSync("./back-office/tmp-mocks/products.json"));

  server = express();

  server.use(compress);

  server.use('/', express['static']('./front-office'), {
    maxAge: 86400000
  });

  server.get('/REST/products', function(req, res) {
    var product, results, _i, _len;
    results = [];
    for (_i = 0, _len = products.length; _i < _len; _i++) {
      product = products[_i];
      results.push({
        id: product.id,
        name: product.name,
        href: '/REST/products/' + product.id
      });
    }
    return res.send(results);
  });

  server.get('/REST/products/:id', function(req, res) {
    var product, searching, _i, _len;
    searching = parseInt(req.params.id);
    for (_i = 0, _len = products.length; _i < _len; _i++) {
      product = products[_i];
      if (product.id === searching) {
        res.send(product);
        return;
      }
    }
    return req.send({});
  });

  console.log('Starting server on port', PORT);

  server.listen(PORT);

}).call(this);
