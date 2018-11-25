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
  tableName: 'products'
});

/* GET home page. */
router.get('/', function(req, res, next) {

  new Product().fetchAll().then((collection) => {
    var data = {
      title: "トップページ",
      content: "",
      // login: req.session.login,
      collection: collection.toArray()
    };
    // console.log(data.collection.attributes.title);
    res.render("index", data);
  }).catch((err) => {
    res.render(500).json({error: true, data: {message: err.message}});
  });

  // if (req.session.login==null){
  //   var data = {
  //     title: "トップページ",
  //     content: ""
  //   }
  //   res.render('index', data);
  // }
});

module.exports = router;
