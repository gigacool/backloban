
require.config
  baseUrl: 'js'
  #urlArgs: "bust=" +  (new Date()).getTime() 
  paths:
    'jquery': '3rdparties/jquery/1.10.1/jquery'
    'underscore': '3rdparties/underscore/1.6.0/underscore-min'
    'backbone': '3rdparties/backbone/1.1.2/backbone.min'
    'handlebars': '3rdparties/handlebars/1.3.0/handlebars'
    'text': '3rdparties/require/2.1.2/text'
    'foundation':"3rdparties/foundation/5.2.1/foundation.min"

  shim:
    'underscore':
      exports: '_'
    'handlebars':
      exports: 'Handlebars'
    'backbone':
      deps: ['underscore', 'jquery']
      exports: 'Backbone'

require ['jquery', 'foundation'], ($) ->

  $(document).ready().foundation()

  $.ajax('REST/products', {
    type:'GET'
    dataType:"json"
  }).done((products)->
    listing = $('ul#products')
    for product in products
      listing.append("<li>#{product.name}</li>")
  )



