(function() {
  var DATABASE, DATABASE_PORT, ObjectId, backlogs, products;

  DATABASE = process.env.DATABASE || "localhost";

  DATABASE_PORT = process.env.DATABASE_PORT || 27017;

  ObjectId = require('mongodb').ObjectID;

  products = null;

  backlogs = null;

  console.log('connecting to database:', DATABASE, 'on port:', DATABASE_PORT);

  require('mongodb').MongoClient.connect("mongodb://" + DATABASE + ":" + 27017 + "{DATABASE_PORT}/backloban", function(error, db) {
    if (error) {
      return console.dir(error);
    }
    console.log('connected to database');
    db.createCollection('products', function(error, collection) {
      if (error) {
        return console.dir(error);
      }
      products = collection;
      return console.log('connected to database:products collection');
    });
    return db.createCollection('backlogs', function(error, collection) {
      if (error) {
        return console.dir(error);
      }
      backlogs = collection;
      return console.log('connected to database:backlog collection');
    });
  });

  exports.get = function(req, res) {
    return products.find({}).toArray(function(error, items) {
      return res.send(error != null ? error : items);
    });
  };

  exports.getOne = function(req, res) {
    return products.findOne({
      _id: ObjectId(req.params.id)
    }, function(error, product) {
      return res.send(error != null ? error : product);
    });
  };

  exports.update = function(req, res) {
    var _ref;
    if (((_ref = req.body) != null ? _ref._id : void 0) != null) {
      req.body._id = ObjectId(req.body._id);
    }
    return products.update({
      _id: ObjectId(req.params.id)
    }, req.body, function(error, newProduct) {
      return res.send(error != null ? error : req.body);
    });
  };

  exports.add = function(req, res) {
    return backlogs.insert([{}, {}, {}], function(error, newBacklogs) {
      req.body.doneBacklog = newBacklogs[0]._id;
      req.body.doingBacklog = newBacklogs[1]._id;
      req.body.todoBacklog = newBacklogs[2]._id;
      return products.insert(req.body, function(error, newProduct) {
        if (newProduct.length !== 1) {
          console.error(newProduct);
        }
        return res.send(error != null ? error : newProduct[0]);
      });
    });
  };

  exports["delete"] = function(req, res) {
    return products.remove({
      _id: ObjectId(req.params.id)
    }, function(error, result) {
      return res.send(error != null ? error : {});
    });
  };

}).call(this);
