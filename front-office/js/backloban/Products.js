(function() {
  define(['jquery', 'underscore', 'backbone', 'handlebars'], function($, _, Backbone, Handlebars) {
    var Collection, Model, ProductView, ProductsView;
    Model = Backbone.Model.extend({
      idAttribute: "_id",
      url: function() {
        if (this.id != null) {
          return "REST/products/" + this.id;
        }
        return "REST/products";
      }
    });
    ProductView = Backbone.View.extend({
      tagName: 'div',
      className: 'row collapse product-listing',
      template: Handlebars.compile('<div class="medium-8 large-10 columns"> <input type="text" placeholder="Rename product" value="{{name}}" style="display:none;"/> <span class="button secondary postfix expand product">{{name}} »</span> </div> <div id="show-state" class="medium-4 large-2 columns"> <span id="edit" class="button postfix expand">edit</span> </div> <div id="edit-state" class="medium-2 large-1 columns" style="display:none;" > <span id="save" class="button postfix expand" >save</span> </div> <div class="medium-2 large-1 columns" style="display:none;" > <span id="delete" class="button postfix expand" title="remove product">delete</span> </div> <div id="confirm-delete-state" class="medium-2 large-1 columns" style="display:none;"> <span id="confirm-delete" class="button postfix expand alert">confirm</span> </div> <div class="medium-2 large-1 columns" style="display:none;"> <span id="cancel-delete" class="button postfix expand ">cancel</span> </div>'),
      events: {
        'click #edit': 'edit',
        'click #save': 'save',
        'click #delete': 'delete',
        'click #confirm-delete': 'confirmDelete',
        'click #cancel-delete': 'cancelDelete',
        'keypress input': 'renameOnEnter'
      },
      initialize: function(options) {
        if (options.model.view != null) {
          options.model.view.remove();
        }
        return options.model.view = this;
      },
      render: function() {
        return this.$el.html(this.template(this.model.toJSON()));
      },
      "delete": function() {
        this.$el.find('#edit-state').hide().next('div').hide();
        return this.$el.find('#confirm-delete-state').show().next('div').show();
      },
      confirmDelete: function() {
        this.collection.remove(this.model);
        return this.model.destroy();
      },
      cancelDelete: function() {
        this.$el.find('#confirm-delete-state').hide().next('div').hide();
        return this.$el.find('#edit-state').show().next('div').show();
      },
      edit: function() {
        this.$el.find('input').show().next('span').hide();
        this.$el.find('#show-state').hide();
        return this.$el.find('#edit-state').show().next('div').show();
      },
      renameOnEnter: function(event) {
        if (13 === event.keyCode) {
          return this.save();
        }
      },
      save: function() {
        var input, newName;
        input = this.$el.find('input');
        newName = input.prop('value');
        if (newName === this.model.get('name')) {
          this.$el.find('input').hide().next('span').show();
          this.$el.find('#show-state').show();
          this.$el.find('#edit-state').hide().next('div').hide();
          return;
        }
        if ((newName != null) && newName !== "") {
          this.model.set('name', newName);
          return this.model.save().done((function(_this) {
            return function() {
              return _this.render();
            };
          })(this));
        }
      }
    });
    Collection = Backbone.Collection.extend({
      model: Model,
      url: 'REST/products'
    });
    ProductsView = Backbone.View.extend({
      template: Handlebars.compile('<div id="product-backlog" class="row collapse"> <h3>Products backlogs</h3> </div> <div class="row collapse"> <div class="medium-8 large-10 columns"> <input id="add-product-input" type="text" placeholder="Add new product"/> </div> <div class="medium-4 large-2 columns"> <span id="add-product" class="button postfix expand disabled">add</span> </div> </div>'),
      events: {
        'click #add-product': 'addProduct',
        'keydown #add-product-input': 'cleanup',
        'keyup #add-product-input': 'addProductOnEnter'
      },
      initialize: function() {
        this.collection.on('sync', this.render, this);
        return this.collection.on('remove', this.render, this);
      },
      remove: function() {
        Backbone.View.prototype.remove.call(this);
        this.collection.off('sync', this.render);
        return this.collection.off('remove', this.render);
      },
      render: function() {
        var listing, product, _i, _len, _ref, _ref1, _results;
        this.$el.html(this.template());
        listing = this.$el.find('#product-backlog');
        _ref1 = (_ref = this.collection) != null ? _ref.models : void 0;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          product = _ref1[_i];
          _results.push(listing.append(new ProductView({
            model: product,
            collection: this.collection
          }).render()));
        }
        return _results;
      },
      cleanup: function(event) {
        if (8 === event.keyCode && this.$el.find('#add-product-input').prop('value').length === 1) {
          return this.$el.find('#add-product').addClass('disabled');
        } else {
          return this.$el.find('#add-product').removeClass('disabled');
        }
      },
      addProductOnEnter: function(event) {
        if (13 === event.keyCode) {
          return this.addProduct();
        }
      },
      addProduct: function() {
        var newModel, newProductName;
        if (this.$el.find('#add-product').hasClass('disabled')) {
          return;
        }
        newProductName = this.$el.find('#add-product-input').prop('value');
        if ((newProductName != null) && newProductName !== "") {
          newModel = new Model({
            'name': newProductName
          });
          return newModel.save().done((function(_this) {
            return function() {
              _this.collection.add(newModel);
              return _this.collection.trigger('sync');
            };
          })(this));
        }
      }
    });
    return {
      Model: Model,
      Collection: Collection,
      View: ProductsView
    };
  });

}).call(this);
