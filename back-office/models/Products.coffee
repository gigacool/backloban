
DATABASE = process.env.DATABASE or "localhost"
DATABASE_PORT = process.env.DATABASE_PORT or 27017

ObjectId = require('mongodb').ObjectID
products = null
backlogs = null

console.log 'connecting to database:', DATABASE, 'on port:', DATABASE_PORT
require('mongodb').MongoClient.connect "mongodb://#{DATABASE}:#{27017}{DATABASE_PORT}/backloban", (error, db)->
  return console.dir error if error
  console.log 'connected to database'
  db.createCollection 'products', (error, collection) ->
    return console.dir error if error
    products = collection
    console.log 'connected to database:products collection'
  db.createCollection 'backlogs', (error, collection) ->
    return console.dir error if error
    backlogs = collection
    console.log 'connected to database:backlog collection'

exports.get = (req, res)->
  products.find({}).toArray (error, items)->
    res.send(if error? then error else items)

exports.getOne = (req, res)->
  products.findOne {_id:ObjectId(req.params.id)}, (error, product)->
    res.send(if error? then error else product)

exports.update = (req, res) ->
  req.body._id = ObjectId(req.body._id) if req.body?._id?
  products.update {_id:ObjectId(req.params.id)}, req.body, (error, newProduct)->
    res.send(if error? then error else req.body)

exports.add = (req, res)->
  backlogs.insert [{},{},{}], (error, newBacklogs)->
    req.body.doneBacklog = newBacklogs[0]._id
    req.body.doingBacklog = newBacklogs[1]._id
    req.body.todoBacklog = newBacklogs[2]._id
    products.insert req.body, (error, newProduct)->
      console.error newProduct if newProduct.length != 1 # one model at a time
      res.send(if error? then error else newProduct[0])

exports.delete = (req, res) ->
  products.remove {_id:ObjectId(req.params.id)},(error, result)->
    res.send(if error? then error else {})
