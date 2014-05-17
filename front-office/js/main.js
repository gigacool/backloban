(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      'jquery': '3rdparties/jquery/1.10.1/jquery',
      'underscore': '3rdparties/underscore/1.6.0/underscore-min',
      'backbone': '3rdparties/backbone/1.1.2/backbone.min',
      'handlebars': '3rdparties/handlebars/1.3.0/handlebars',
      'text': '3rdparties/require/2.1.2/text',
      'foundation': "3rdparties/foundation/5.2.1/foundation.min"
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

  require(['jquery', 'foundation'], function($) {
    $(document).ready().foundation();
    return $.ajax('REST/products', {
      type: 'GET',
      dataType: "json"
    }).done(function(products) {
      var listing, product, _i, _len, _results;
      listing = $('ul#products');
      _results = [];
      for (_i = 0, _len = products.length; _i < _len; _i++) {
        product = products[_i];
        _results.push(listing.append("<li>" + product.name + "</li>"));
      }
      return _results;
    });
  });

}).call(this);
