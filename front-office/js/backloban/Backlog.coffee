define [
  'jquery'
  'underscore'
  'backbone.ext/BackboneExt'
  'handlebars'
], ($, _, Backbone, Handlebars) ->


  # Defines a product listing
  Model = Backbone.Model.extend({
    idAttribute: "_id"
    url: ()->
      "REST/products/#{@get('productId')}/backlogs/#{@id}"
  })

  DoingBacklogView = Backbone.View.extend({



  })

  TodoBacklogView = DoingBacklogView.extend({
    template: Handlebars.compile('{{#each items}}
   <div class="row collapse product-listing">
      <div class="medium-8 large-10 columns">
        <span id="product" class="button secondary postfix expand product">{{name}}</span>
      </div>
   </div>
  {{/each}}
    <div class="row collapse">
      <div class="medium-8 large-10 columns">
        <input id="add-product-input" type="text" placeholder="Add new item"/>
      </div>
      <div class="medium-4 large-2 columns">
        <span id="add-product" class="button postfix expand disabled">add</span>
      </div>
    </div>')

    initialize:()->
      @on(@model, 'sync', @render, @)

    remove:()->
      Backbone.View.prototype.remove.call(this)

    render: ()->
      return @$el.html(@template(@model.toJSON()))
  })

  View = Backbone.View.extend({
    template: Handlebars.compile('
              <div id="product-backlog" class="row collapse">
                <h3>{{name}}</h3>
              </div>
              <div id="doing-backlog"></div>
              <div id="todo-backlog"></div>

              ')

    initialize:()->
      @on(@model, 'sync', @render, this)
      return @

    remove:()->
      @todo?.remove()
      @doing?.remove()
      Backbone.View.prototype.remove.call(this)
      return @

    render: ()->
      @$el.html(@template(@model.toJSON()))
      @todo?.remove()
      @doing?.remove()
      @todo = new TodoBacklogView({model:new Model({_id:@model.get('todoBacklog'),productId:@model.get('_id')}), el:"#todo-backlog"})
      @doing = new DoingBacklogView({model:new Model({_id:@model.get('doingBacklog'),productId:@model.get('_id')}), el:"#doing-backlog"})
      @todo.model.fetch()
      @doing.model.fetch()
      return @$el.html()
  })


  return {
    View
    Model
  }
