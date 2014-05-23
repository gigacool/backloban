define [
  'jquery'
  'underscore'
  'backbone'
  'handlebars'
], ($, _, Backbone, Handlebars) ->

  # Defines a product model
  Model = Backbone.Model.extend({
    url: ()->
      "REST/products/#{@get('id')}"
  })

  # Defines a product listing
  Collection = Backbone.Collection.extend({
    model: Model
    url: 'REST/products'
  })


  # Defines the view used to display, edit or delete a product.
  ProductView = Backbone.View.extend({
    tagName: 'div'
    className: 'row collapse product-listing'
    template: Handlebars.compile('<div class="medium-8 large-10 columns">
            <input type="text" placeholder="Rename product" value="{{name}}" style="display:none;"/>
            <span class="button secondary postfix expand product">{{name}} »</span>
          </div>
          <div id="show-state" class="medium-4 large-2 columns">
            <span id="edit" class="button postfix expand">edit</span>
          </div>
          <div id="edit-state" class="medium-2 large-1 columns" style="display:none;" >
              <span id="save" class="button postfix expand" >save</span>
            </div>
          <div class="medium-2 large-1 columns" style="display:none;" >
              <span id="delete" class="button postfix expand" title="remove product">delete</span>
          </div>
          <div id="confirm-delete-state" class="medium-2 large-1 columns" style="display:none;">
            <span id="confirm-delete" class="button postfix expand alert">confirm</span>
          </div>
          <div class="medium-2 large-1 columns" style="display:none;">
            <span id="cancel-delete" class="button postfix expand ">cancel</span>
          </div>
          ')

    events:
      'click #edit': 'edit'
      'click #save': 'save'
      'click #delete': 'delete'
      'click #confirm-delete': 'confirmDelete'
      'click #cancel-delete': 'cancelDelete'
      'keypress input': 'renameOnEnter'

    initialize: (options) ->
      options.model.view.remove() if options.model.view?
      options.model.view = @

    render: ()->
      @$el.html(@template(@model.toJSON()))

    delete: ()->
      @$el.find('#edit-state').hide().next('div').hide()
      @$el.find('#confirm-delete-state').show().next('div').show()

    confirmDelete: ()->
      @collection.remove(@model)

    cancelDelete:()->
      @$el.find('#confirm-delete-state').hide().next('div').hide()
      @$el.find('#edit-state').show().next('div').show()

    edit: ()->
      @$el.find('input').show().next('span').hide()
      @$el.find('#show-state').hide()
      @$el.find('#edit-state').show().next('div').show()

    renameOnEnter: (event)->
      @save() if 13 == event.keyCode

    save: ()->
      input = @$el.find('input')
      newName = input.prop('value')
      if newName == @model.get('name')
        @$el.find('input').hide().next('span').show()
        @$el.find('#show-state').show()
        @$el.find('#edit-state').hide().next('div').hide()
        return
      if newName? and newName != ""
        @model.set('name', newName)
        @render()
  })

  # Defines the view meant to display products and to add new products.
  ProductsView = Backbone.View.extend({
    template: Handlebars.compile('
          <div id="product-backlog" class="row collapse">
            <h3>Products backlogs</h3>
          </div>
          <div class="row collapse">
            <div class="medium-8 large-10 columns">
              <input id="add-product-input" type="text" placeholder="Add new product"/>
            </div>
            <div class="medium-4 large-2 columns">
              <span id="add-product" class="button postfix expand disabled">add</span>
            </div>
          </div>')

    events:
      'click #add-product': 'addProduct'
      'keydown #add-product-input': 'cleanup'
      'keyup #add-product-input': 'addProductOnEnter'

    initialize: ()->
      @collection.on('sync', @render, this)
      @collection.on('remove', @render, this)

    remove: ()->
      Backbone.View.prototype.remove.call(this)
      @collection.off('sync', @render)

    render: ()->
      @$el.html(@template())
      listing = @$el.find('#product-backlog')
      for product in @collection?.models
        listing.append(new ProductView({model: product, collection: @collection}).render())

    cleanup: (event)->
      if 8 == event.keyCode and @$el.find('#add-product-input').prop('value').length == 1 # before removal of last character
        @$el.find('#add-product').addClass('disabled')
      else
        @$el.find('#add-product').removeClass('disabled')

    addProductOnEnter: (event)->
      return @addProduct() if 13 == event.keyCode

    addProduct: ()->
      return if @$el.find('#add-product').hasClass('disabled')
      newProductName = @$el.find('#add-product-input').prop('value')
      if newProductName? and newProductName != ""
        @collection.add(new Model({'name': newProductName}))
        @collection.trigger('sync')
  })

  return {
  Model
  Collection
  View: ProductsView
  }




