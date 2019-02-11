var express = require('express');

var Bookshelf = require('../config/bookshelf.config.js');

// カプセル化(振る舞いの隠蔽)
var User = Bookshelf.Model.extend({
  tableName: 'users',

  signup_data: function(){
    var data = {
      title: "新規登録",
      form: {email: '', password: '', nickname: ''},
      content: ""
    };
    return data;
  },

  make_content: function(result_arr){

    // 文字列型はプリミティブ型なので値渡し
    var content = '<ul class="error">';
    // var content2 = content;
    // content2 = 'hoge'
    // console.log(content);
    // console.log(content2);


    for(var n in result_arr){
      content += '<li>' + result_arr[n].msg + '</li>'
    }

    content += '</ul>';
    return content;
  },

  add_data: function(req, result_arr){
    var data = {
      title: '新規登録',
      content: make_content(result_arr),
      form: req.body
    }
    return data;
  },

  signin_data: function(){
    var data = {
      title: "ログイン",
      content: ""
    }
    return data;
  },

  signin_post_data: function(req, result_arr){

    var data = {
      title: 'Login',
      content: make_content(result_arr),
      form: req.body
    }
    return data;
  },

  signin_post_data_error: function(req){
    var data = {
      title: '再入力',
      content:'<p class="error">名前またはパスワードが違います。</p>',
      form: req.body
    };
    return data;
  },

  signin_post_data_success: function(req){
    var data = {
      title: 'Login',
      content: '<p>ログインしました！</p>',
      form: req.body,
      collection: ""
    };
    return data;
  },

  signout_data: function(req){
    var data = {
      title: 'Signout',
      content: '<p>ログアウトしました！</p>',
      form: req.body
    };
    return data;
  },

  show_data: function(req){
    var data = {
      title: "マイページ"
    }
    return data;
  },

});

module.exports = User;
