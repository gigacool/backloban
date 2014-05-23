
DATABASE = process.env.DATABASE or "localhost"
DATABASE_PORT = process.env.DATABASE_PORT or 27017

ObjectId = require('mongodb').ObjectID
products = null

console.log 'connecting to database:', DATABASE, 'on port:', DATABASE_PORT
require('mongodb').MongoClient.connect("mongodb://#{DATABASE}:#{27017}{DATABASE_PORT}/backloban", (error, db)->
  return console.dir error if error
  console.log 'connected to database'
  db.createCollection('products', (error, collection) ->
    return console.dir error if error
    products = collection
    console.log 'connected to database:products collection'
  )
)

exports.get = (req, res)->
  products.find().toArray (error, items)->
    res.send(if error? then error else items)

exports.update = (req, res) ->
  products.update {_id:ObjectId(req.params.id)}, req.body, (error, newProduct)->
    res.send(if error? then error else newProduct)

exports.add = (req, res)->
  products.insert req.body, (error, newProduct)->
    res.send(if error? then error else newProduct)

exports.delete = (req, res) ->
  products.remove {_id:ObjectId(req.params.id)},(error, result)->
    res.send(if error? then error else {})
