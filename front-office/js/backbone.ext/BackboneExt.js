(function() {
  define(['underscore', 'jquery', 'backbone'], function(_, $, Backbone) {
    var View;
    View = Backbone.View.extend({
      __on: [],
      off: function(model, event, callback) {
        model.off(event, callback);
        return this;
      },
      on: function(model, event, callback, context) {
        model.on(event, callback, context);
        this.__on.push({
          model: model,
          event: event,
          callback: callback
        });
        return this;
      },
      remove: function() {
        var event, _i, _len, _ref;
        Backbone.View.prototype.remove.call(this);
        _ref = this.__on;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          this.off(event.model, event.event, event.callback);
        }
        return this.el.id;
      }
    });
    return {
      View: View,
      Model: Backbone.Model,
      Collection: Backbone.Collection
    };
  });

}).call(this);
