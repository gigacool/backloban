define [
  'jquery'
  'underscore'
  'backbone'
  'backloban/Products'
  'backloban/Backlog'
], ($, _, Backbone, Products, Backlog) ->
  Router = Backbone.Router.extend({

    routes:
      '': "home"
      'products/:id': "product"

    home: () ->
      console.log "home"
      @backlogView?.$el.children().animate({height: 0, opacity: 0}, 'slow', () ->
        $(this).remove();
      )
      products = new Products.Collection()
      @productView?.remove()
      @productView = new Products.View({
        collection:products
        el:'#products-container'
      })
      products.fetch()

    product: (productId) ->
      @productView?.$el.children().animate({height: 0, opacity: 0}, 'slow', () ->
          $(this).remove();
      )

      product = new Products.Model({'_id':productId})
      @backlogView = new Backlog.View({
        model: product
        el: '#product-backlogs'
      })
      product.fetch()


  })

  Router