var express = require('express');
var ProductIterator = require('./productIterator.js');

var Bookshelf = require('../config/bookshelf.config.js');

var Product = Bookshelf.Model.extend({
  tableName: 'products',

  new_data: function(req) {
    var data = {
      title: "レビューを投稿する",
      // idを渡す必要ある？別の方法があるのでは。
      id: req.params.id
    }
    return data;
  },

  add_review_data: function(req){
    var record = {
      product_id: req.body.id,
      rate: req.body.rate,
      review: req.body.review,
      user_id: req.session.login.id
    }
    return record;
  },

  escape_review: function(req){
    // エスケープ処理、レビュー内容にHTMLのタグやJSのスクリプトがないかチェック、
    req.sanitize("review").escape();
  },

  search_data: function(req){
    var data = {
      title: "映画を検索する",
      collection: ""
    }
    return data;
  },

  // function search_data_post(collection){
  //   var data = {
  //     title: "映画を検索する",
  //     collection: collection
  //   };
  //   return data;
  // }


  show_data: function(collection){
    var data = {
      title: "検索ページ",
      collection: collection.toArray()
    };
    return data;
  },

  index_data: function(req, collection){
    var data = {
      title: "トップページ",
      content: "",
      login: req.session.login,
      collection: collection.toArray()
    };
    return data;
  },

  // initialize: function(){
  //   return reviews = [];
  // },
  //
  // get_review_at: function(index){
  //   return reviews[index];
  // },
  //
  // add_review: function(review){
  //   return reviews << review;
  // },
  //
  // length: function(){
  //   return reviews.length;
  // },
  //
  // iterator: function(){
  //   ProductIterator.new(self);
  // },

});

module.exports = Product;
