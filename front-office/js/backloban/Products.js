(function() {
  define(['jquery', 'underscore', 'backbone', 'handlebars'], function($, _, Backbone, Handlebars) {
    var Collection, Model, ProductView, ProductsView;
    Model = Backbone.Model.extend({
      url: function() {
        return "REST/products/" + (this.get('id'));
      }
    });
    Collection = Backbone.Collection.extend({
      model: Model,
      url: 'REST/products'
    });
    ProductView = Backbone.View.extend({
      tagName: 'li',
      template: Handlebars.compile('<a href="">{{name}}</a>'),
      events: {
        'click li': 'toggleDetail'
      },
      initialize: function(options) {
        if (options.model.view != null) {
          options.model.view.remove();
        }
        return options.model.view = this;
      },
      render: function() {
        if (this.showDetail) {

        } else {
          return this.$el.html(this.model.get('name'));
        }
      },
      toggleDetail: function(event) {
        this.showDetail = !this.showDetail;
        this.remove();
        return this.render();
      }
    });
    ProductsView = Backbone.View.extend({
      initialize: function() {
        return this.collection.on('sync', this.render, this);
      },
      remove: function() {
        Backbone.View.prototype.remove.call(this);
        return this.collection.off('sync', this.render);
      },
      render: function() {
        var listing, product, _i, _len, _ref, _ref1;
        listing = $('<ul id="products" class="products"></ul>');
        _ref1 = (_ref = this.collection) != null ? _ref.models : void 0;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          product = _ref1[_i];
          listing.append(new ProductView({
            model: product
          }).render());
        }
        return this.$el.html(listing);
      }
    });
    return {
      Model: Model,
      Collection: Collection,
      View: ProductsView
    };
  });

}).call(this);
