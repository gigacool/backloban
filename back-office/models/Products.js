(function() {
  var DATABASE, DATABASE_PORT, ObjectId, products;

  DATABASE = process.env.DATABASE || "localhost";

  DATABASE_PORT = process.env.DATABASE_PORT || 27017;

  ObjectId = require('mongodb').ObjectID;

  products = null;

  console.log('connecting to database:', DATABASE, 'on port:', DATABASE_PORT);

  require('mongodb').MongoClient.connect("mongodb://" + DATABASE + ":" + 27017 + "{DATABASE_PORT}/backloban", function(error, db) {
    if (error) {
      return console.dir(error);
    }
    console.log('connected to database');
    return db.createCollection('products', function(error, collection) {
      if (error) {
        return console.dir(error);
      }
      products = collection;
      return console.log('connected to database:products collection');
    });
  });

  exports.get = function(req, res) {
    return products.find().toArray(function(error, items) {
      return res.send(error != null ? error : items);
    });
  };

  exports.update = function(req, res) {
    return products.update({
      _id: ObjectId(req.params.id)
    }, req.body, function(error, newProduct) {
      return res.send(error != null ? error : newProduct);
    });
  };

  exports.add = function(req, res) {
    return products.insert(req.body, function(error, newProduct) {
      return res.send(error != null ? error : newProduct);
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
