###
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

###
PORT = process.env.PORT or 3000

express = require('express')
compress = require('compression')()
fs = require('fs')

products = JSON.parse(fs.readFileSync("./back-office/tmp-mocks/products.json"))


server = express()
server.use(compress)
# Deliver static content
server.use('/', express['static']('./front-office'), {maxAge: 86400000})

server.get('/REST/products', (req, res)->
  results = []
  for product in products
    results.push({
      id:product.id
      name:product.name
      href:'/REST/products/'+product.id
    })
  res.send(results)
)
server.get('/REST/products/:id', (req, res)->
  searching = parseInt(req.params.id)
  for product in products
    if product.id == searching
      res.send(product)
      return
  req.send({})
)

console.log('Starting server on port', PORT)
server.listen(PORT)
