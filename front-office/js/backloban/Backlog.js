(function() {
  define(['jquery', 'underscore', 'backbone', 'handlebars'], function($, _, Backbone, Handlebars) {
    var DoingBacklogView, Model, TodoBacklogView, View;
    Model = Backbone.Model.extend({
      idAttribute: "_id",
      url: function() {
        return "REST/products/" + (this.get('productId')) + "/backlogs/" + this.id;
      }
    });
    TodoBacklogView = Backbone.View.extend({});
    DoingBacklogView = TodoBacklogView.extend({
      template: Handlebars.compile('{{#each items}} <div class="medium-8 large-10 columns"> <span id="product" class="button secondary postfix expand product">{{name}}</span> </div> {{/each}}'),
      initialize: function(options) {
        return this.model.on('sync', this.render, this);
      },
      remove: function() {
        Backbone.View.prototype.remove.call(this);
        return this.model.off('sync', this.render);
      },
      render: function() {
        return this.$el.html(this.template(this.model.toJSON()));
      }
    });
    View = Backbone.View.extend({
      template: Handlebars.compile('<div id="product-backlog" class="row collapse"> <h3>{{name}}</h3> </div> <div class="row collapse" id="doing-backlog"></div>'),
      initialize: function(options) {
        return this.model.on('sync', this.render, this);
      },
      remove: function() {
        var _ref, _ref1;
        if ((_ref = this.todo) != null) {
          _ref.remove();
        }
        if ((_ref1 = this.doing) != null) {
          _ref1.remove();
        }
        Backbone.View.prototype.remove.call(this);
        return this.model.off('sync', this.render);
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        if (this.todo != null) {
          this.todo.remove();
        }
        if (this.doing != null) {
          this.doing.remove();
        }
        this.todo = new TodoBacklogView({
          model: new Model({
            _id: this.model.get('todoBacklog'),
            productId: this.model.get('_id')
          })
        });
        this.doing = new DoingBacklogView({
          model: new Model({
            _id: this.model.get('doingBacklog'),
            productId: this.model.get('_id')
          }),
          el: "#doing-backlog"
        });
        this.todo.model.fetch();
        this.doing.model.fetch();
        return this;
      }
    });
    return {
      View: View,
      Model: Model
    };
  });

}).call(this);
