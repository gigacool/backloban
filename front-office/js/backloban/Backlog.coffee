define [
  'jquery'
  'underscore'
  'backbone'
  'handlebars'
], ($, _, Backbone, Handlebars) ->


  # Defines a product listing
  Model = Backbone.Model.extend({
    idAttribute: "_id"
    url: ()->
      "REST/products/#{@get('productId')}/backlogs/#{@id}"
  })

  TodoBacklogView = Backbone.View.extend({



  })

  DoingBacklogView = TodoBacklogView.extend({
    template: Handlebars.compile('
    {{#each items}}
    <div class="medium-8 large-10 columns">
      <span id="product" class="button secondary postfix expand product">{{name}}</span>
    </div>
    {{/each}}
    ')

    initialize:(options)->
      @model.on('sync', @render, @)

    remove:()->
      Backbone.View.prototype.remove.call(this)
      @model.off('sync', @render)


    render: ()->
      return @$el.html(@template(@model.toJSON()))

  })


  View = Backbone.View.extend({
    template: Handlebars.compile('
              <div id="product-backlog" class="row collapse">
                <h3>{{name}}</h3>
              </div>
              <div class="row collapse" id="doing-backlog"></div>')

    initialize:(options)->
      @model.on('sync', @render, this)

    remove:()->
      @todo?.remove()
      @doing?.remove()
      Backbone.View.prototype.remove.call(this)
      @model.off('sync', @render)

    render: ()->
      @$el.html(@template(@model.toJSON()))
      @todo.remove() if @todo?
      @doing.remove() if @doing?
      @todo = new TodoBacklogView({model:new Model({_id:@model.get('todoBacklog'),productId:@model.get('_id')})})
      @doing = new DoingBacklogView({model:new Model({_id:@model.get('doingBacklog'),productId:@model.get('_id')}), el:"#doing-backlog"})
      @todo.model.fetch()
      @doing.model.fetch()
      @
  })


  return {
    View
    Model
  }
