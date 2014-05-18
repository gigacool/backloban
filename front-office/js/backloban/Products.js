(function() {
  define(['jquery', 'underscore', 'backbone', 'handlebars'], function($, _, Backbone, Handlebars) {
    var Collection, Model;
    Model = Backbone.Model.extend({
      url: function() {
        return "REST/products/" + (this.get('id'));
      }
    });
    Collection = Backbone.Collection.extend({
      model: Model,
      url: 'REST/products'
    });
    return {
      Model: Model,
      Collection: Collection
    };
  });

}).call(this);
