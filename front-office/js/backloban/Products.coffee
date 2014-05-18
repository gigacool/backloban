define [
  'jquery'
  'underscore'
  'backbone'
  'handlebars'
], ($, _, Backbone, Handlebars) ->
  Model = Backbone.Model.extend({
    url: ()->
      "REST/products/#{@get('id')}"
  })

  Collection = Backbone.Collection.extend({
    model: Model
    url: 'REST/products'
  })


  ProductView = Backbone.View.extend({
    tagName:'li'
    template:Handlebars.compile('<a href="">{{name}}</a>')

    events:
      'click li': 'toggleDetail'

    initialize: (options) ->
      options.model.view.remove() if options.model.view?
      options.model.view = @

    render: ()->
      if @showDetail

      else
        @$el.html(@model.get('name'))

    toggleDetail: (event)->
      @showDetail = !@showDetail
      @remove()
      @render()

  })

  ProductsView = Backbone.View.extend({

    initialize:()->
      @collection.on('sync', @render, this)

    remove:()->
      Backbone.View.prototype.remove.call(this)
      @collection.off('sync', @render)

    render: ()->
      listing = $('<ul id="products" class="products"></ul>')
      for product in @collection?.models
        listing.append(new ProductView({model: product}).render())
      @$el.html(listing)
  })


  return {
  Model
  Collection
  View: ProductsView
  }




