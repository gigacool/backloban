
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

  server.get('/REST/products/:id', products.getOne);

  server.post('/REST/products', products.add);

  server.put('/REST/products/:id', products.update);

  server["delete"]('/REST/products/:id', products["delete"]);

  server.get('/REST/products/:id/backlogs/:backlogid', function(req, res) {
    return res.send({
      _id: req.params.backlogid,
      items: [
        {
          _id: 1,
          name: "Setup application content (package.json, Gruntfile.js)",
          description: "",
          cost: 1
        }, {
          _id: 2,
          name: "setup front-office environment",
          description: "",
          cost: 1
        }, {
          _id: 3,
          name: "setup unit/integration test environment",
          description: "",
          cost: 1
        }, {
          _id: 4,
          name: "push general ui mockups",
          description: "",
          cost: 1
        }, {
          _id: 5,
          name: "list products",
          description: "",
          cost: 1
        }, {
          _id: 6,
          name: "create/edit/delete product",
          description: "",
          cost: 1
        }, {
          _id: 7,
          name: "create/edit/delete product server side (REST API) and wire it",
          description: "",
          cost: 1
        }, {
          _id: 8,
          name: "improve slightly ergonomics, cancel edition mode if one clicks outside the product view",
          description: "",
          cost: 1
        }, {
          _id: 9,
          name: "select product (i.e. go to the product detail view when product is selected)",
          description: "",
          cost: 1
        }, {
          _id: 10,
          name: "create minimal backlog item creation form",
          description: "",
          cost: 1
        }, {
          _id: 11,
          name: "list backlog items",
          description: "",
          cost: 1
        }, {
          _id: 12,
          name: "add new item to listing",
          description: "",
          cost: 1
        }, {
          _id: 13,
          name: "delete item from listing",
          description: "",
          cost: 1
        }, {
          _id: 14,
          name: "move items via drag 'n drop",
          description: "",
          cost: 1
        }, {
          _id: 15,
          name: "move selected item via keyup/keydown",
          description: "",
          cost: 1
        }, {
          _id: 16,
          name: "save and read items to server",
          description: "",
          cost: 1
        }, {
          _id: 17,
          name: "show item detail in backlog item listing",
          description: "",
          cost: 1
        }, {
          _id: 18,
          name: "add an item from the backlog to a ongoing work list item",
          description: "",
          cost: 1
        }, {
          _id: 19,
          name: "remove an item from ongoing listing back to backlog",
          description: "",
          cost: 1
        }, {
          _id: 20,
          name: "add nice icons and review design a bit",
          description: "",
          cost: 1
        }, {
          _id: 21,
          name: "create tasks under an ongoing item",
          description: "",
          cost: 1
        }, {
          _id: 22,
          name: "list tasks for a given item",
          description: "",
          cost: 1
        }, {
          _id: 23,
          name: "close/reopen task",
          description: "",
          cost: 1
        }, {
          _id: 24,
          name: "close backlog items",
          description: "",
          cost: 1
        }, {
          _id: 25,
          name: "add tags to backlog item",
          description: "",
          cost: 1
        }, {
          _id: 26,
          name: "list available tags ",
          description: "",
          cost: 1
        }, {
          _id: 27,
          name: "filter backlog per existing tags",
          description: "",
          cost: 1
        }, {
          _id: 28,
          name: "add simple timeline product progress chart",
          description: "",
          cost: 1
        }, {
          _id: 29,
          name: "take a nap and think about useful features such as user management, reporting or bug management",
          description: "",
          cost: 1
        }
      ]
    });
  });

  console.log('Starting server on port', PORT);

  server.listen(PORT);

}).call(this);
