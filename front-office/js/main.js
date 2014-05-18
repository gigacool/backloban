(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      'jquery': '3rdparties/jquery/1.10.1/jquery',
      'underscore': '3rdparties/underscore/1.6.0/underscore.min',
      'backbone': '3rdparties/backbone/1.1.2/backbone',
      'handlebars': '3rdparties/handlebars/1.3.0/handlebars',
      'text': '3rdparties/require/2.1.2/text',
      'foundation': "3rdparties/foundation/5.2.1/foundation.min",
      'backloban': "backloban"
    },
    shim: {
      'underscore': {
        exports: '_'
      },
      'handlebars': {
        exports: 'Handlebars'
      },
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  require(['jquery', 'underscore', 'backbone', 'backloban/Products', 'foundation'], function($, _, Backbone, Products) {
    var products;
    $(document).ready().foundation();
    products = new Products.Collection();
    products.on('sync', function() {
      var listing, product, _i, _len, _ref, _results;
      console.log('here');
      listing = $('ul#products').html('');
      _ref = products.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        product = _ref[_i];
        _results.push(listing.append("<li>" + (product.get('name')) + "</li>"));
      }
      return _results;
    });
    return products.fetch();
  });

}).call(this);
