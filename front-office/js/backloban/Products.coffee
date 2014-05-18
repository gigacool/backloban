define [
    'jquery'
    'underscore'
    'backbone'
    'handlebars'
  ], ($, _, Backbone, Handlebars) ->


  Model= Backbone.Model.extend({
    url: ()->
      "REST/products/#{@get('id')}"
  })

  Collection= Backbone.Collection.extend({
    model:Model
    url: 'REST/products'
  })





  return {
    Model
    Collection
  }




