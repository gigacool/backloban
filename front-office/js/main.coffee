
require.config
  baseUrl: 'js'
  #urlArgs: "bust=" +  (new Date()).getTime() 
  paths:
    'jquery': '3rdparties/jquery/1.10.1/jquery'
    'underscore': '3rdparties/underscore/1.6.0/underscore.min'
    'backbone': '3rdparties/backbone/1.1.2/backbone'
    'handlebars': '3rdparties/handlebars/1.3.0/handlebars'
    'text': '3rdparties/require/2.1.2/text'
    'foundation':"3rdparties/foundation/5.2.1/foundation.min"

    'backloban':"backloban"

  shim:
    'underscore':
      exports: '_'
    'handlebars':
      exports: 'Handlebars'
    'backbone':
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    'foundation':
      deps:['jquery']

require ['jquery', 'underscore', 'backbone', 'backloban/Products', 'foundation'], ($, _, Backbone, Products) ->

  $(document).ready().foundation()

  products = new Products.Collection()
  productsView = new Products.View({collection:products, el:'#products-container'})
  products.fetch()

  ###
  products.on('sync', ()->
    listing = $('ul#products').html('')
    for product in products.models
      listing.append("<li>#{product.get('name')}</li>")
  )
  ###






