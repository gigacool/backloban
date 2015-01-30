(function() {
  define(['jquery', 'underscore', 'backbone.ext/BackboneExt', 'handlebars'], function($, _, Backbone, Handlebars) {
    var DoingBacklogView, Model, TodoBacklogView, View;
    Model = Backbone.Model.extend({
      idAttribute: "_id",
      url: function() {
        return "REST/products/" + (this.get('productId')) + "/backlogs/" + this.id;
      }
    });
    DoingBacklogView = Backbone.View.extend({});
    TodoBacklogView = DoingBacklogView.extend({
      template: Handlebars.compile('{{#each items}} <div class="row collapse product-listing"> <div class="medium-8 large-10 columns"> <span id="product" class="button secondary postfix expand product">{{name}}</span> </div> </div> {{/each}} <div class="row collapse"> <div class="medium-8 large-10 columns"> <input id="add-product-input" type="text" placeholder="Add new item"/> </div> <div class="medium-4 large-2 columns"> <span id="add-product" class="button postfix expand disabled">add</span> </div> </div>'),
      initialize: function() {
        return this.on(this.model, 'sync', this.render, this);
      },
      remove: function() {
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        return this.$el.html(this.template(this.model.toJSON()));
      }
    });
    View = Backbone.View.extend({
      template: Handlebars.compile('<div id="product-backlog" class="row collapse"> <h3>{{name}}</h3> </div> <div id="doing-backlog"></div> <div id="todo-backlog"></div>'),
      initialize: function() {
        this.on(this.model, 'sync', this.render, this);
        return this;
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
        return this;
      },
      render: function() {
        var _ref, _ref1;
        this.$el.html(this.template(this.model.toJSON()));
        if ((_ref = this.todo) != null) {
          _ref.remove();
        }
        if ((_ref1 = this.doing) != null) {
          _ref1.remove();
        }
        this.todo = new TodoBacklogView({
          model: new Model({
            _id: this.model.get('todoBacklog'),
            productId: this.model.get('_id')
          }),
          el: "#todo-backlog"
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
        return this.$el.html();
      }
    });
    return {
      View: View,
      Model: Model
    };
  });

}).call(this);
