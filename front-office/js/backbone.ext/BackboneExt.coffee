define [
    'underscore'
    'jquery'
    'backbone'
  ], (_, $, Backbone)->

    View = Backbone.View.extend({

      __on:[]

      off:(model, event, callback) ->
        model.off(event, callback)
        return @

      on:(model, event, callback, context) ->
        model.on(event, callback, context)
        @__on.push({model, event, callback})
        return @

      remove:()->
        Backbone.View.prototype.remove.call(this)
        @off(event.model, event.event, event.callback) for event in @__on
        @el.id



    })



    return {
      View:View
      Model:Backbone.Model
      Collection:Backbone.Collection
    }