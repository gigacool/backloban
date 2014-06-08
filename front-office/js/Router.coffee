define [
  'jquery'
  'underscore'
  'backbone'
  'backloban/Products'
  'backloban/Backlog'
], ($, _, Backbone, Products, Backlog) ->

  # We fetch content everytime we get to the page to keep up to date as much as possible.
  Router = Backbone.Router.extend({

    routes:
      '': "home"
      'products/:id': "product"

    home: () ->
      $('#products-container').append('<div id="products-container-el"></div>')
      products = new Products.Collection()
      @productView = new Products.View({
        collection:products
        el:'#products-container-el'
      })
      products.fetch()
      @backlogView?.remove()

    product: (productId) ->
      $('#product-backlogs').append('<div id="product-backlogs-el"></div>')
      product = new Products.Model({'_id':productId})
      @backlogView = new Backlog.View({
        model: product
        el: '#product-backlogs-el'
      })
      product.fetch()
      @productView?.remove()

  })

  Router