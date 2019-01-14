var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host     :'localhost',
    user     :'root',
    password :'',
    database :'mooovi_express',
    charset  :'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

var Product = Bookshelf.Model.extend({
  tableName: 'products',
  hasTimestamps: true
});


/* GET home page. */
router.get('/', function(req, res, next) {
  new Product().fetchAll().then((collection) => {
    var data = {
      title: "トップページ",
      content: "",
      login: req.session.login,
      collection: collection.toArray()
    };

    // dataはオブジェクト型のオブジェクトなので参照渡し
    console.log(data);
    data2 = data;
    data2["title"] = "toppage";
    console.log(data);
    console.log(data2);

    // funcはオブジェクト型の関数なので参照渡し
    var func = function(){
    };
    func.hoge = 0
    console.log(func.hoge);
    func2 = func;
    func2.hoge = 1
    console.log(func.hoge)
    console.log(func2.hoge);

    res.render("index", data);
  }).catch((err) => {
    res.render(500).json({error: true, data: {message: err.message}});
  });

  // コメントアウトを外すと上のres.renderとダブる
  // if (req.session.login==null){
  //   var data = {
  //     title: "トップページ",
  //     content: ""
  //   }
  //   res.render('index', data);
  // }
});

module.exports = router;
