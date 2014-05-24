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
      },
      'foundation': {
        deps: ['jquery']
      }
    }
  });

  require(['jquery', 'underscore', 'backbone', 'Router', 'foundation'], function($, _, Backbone, Router) {
    $(document).ready().foundation();
    new Router();
    return Backbone.history.start();
  });

}).call(this);
