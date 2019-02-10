var express = require('express');

var product = require('../model/product');
var user = require('../model/user');

var Bookshelf = require('../config/bookshelf.config.js');

var Review = Bookshelf.Model.extend({
  tableName: 'reviews',
  hasTimestamps: true,
  product: function(){
    return this.belongsTo(product);
  },
  user: function(){
    return this.belongsTo(user);
  },

  // initialize: function(title){
  //   return title;
  // },

});

module.exports = Review;
