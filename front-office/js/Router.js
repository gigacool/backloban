(function() {
  define(['jquery', 'underscore', 'backbone', 'backloban/Products', 'backloban/Backlog'], function($, _, Backbone, Products, Backlog) {
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        '': "home",
        'products/:id': "product"
      },
      home: function() {
        var products, _ref, _ref1;
        console.log("home");
        if ((_ref = this.backlogView) != null) {
          _ref.$el.children().animate({
            height: 0,
            opacity: 0
          }, 'slow', function() {
            return $(this).remove();
          });
        }
        products = new Products.Collection();
        if ((_ref1 = this.productView) != null) {
          _ref1.remove();
        }
        this.productView = new Products.View({
          collection: products,
          el: '#products-container'
        });
        return products.fetch();
      },
      product: function(productId) {
        var product, _ref;
        if ((_ref = this.productView) != null) {
          _ref.$el.children().animate({
            height: 0,
            opacity: 0
          }, 'slow', function() {
            return $(this).remove();
          });
        }
        product = new Products.Model({
          '_id': productId
        });
        this.backlogView = new Backlog.View({
          model: product,
          el: '#product-backlogs'
        });
        return product.fetch();
      }
    });
    return Router;
  });

}).call(this);
