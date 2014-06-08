(function() {
  define(['jquery', 'underscore', 'backbone', 'backloban/Products', 'backloban/Backlog'], function($, _, Backbone, Products, Backlog) {
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        '': "home",
        'products/:id': "product"
      },
      home: function() {
        var products, _ref;
        $('#products-container').append('<div id="products-container-el"></div>');
        products = new Products.Collection();
        this.productView = new Products.View({
          collection: products,
          el: '#products-container-el'
        });
        products.fetch();
        return (_ref = this.backlogView) != null ? _ref.remove() : void 0;
      },
      product: function(productId) {
        var product, _ref;
        $('#product-backlogs').append('<div id="product-backlogs-el"></div>');
        product = new Products.Model({
          '_id': productId
        });
        this.backlogView = new Backlog.View({
          model: product,
          el: '#product-backlogs-el'
        });
        product.fetch();
        return (_ref = this.productView) != null ? _ref.remove() : void 0;
      }
    });
    return Router;
  });

}).call(this);
