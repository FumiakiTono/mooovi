var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host     :'localhost',
    user     :'root',
    password :'',
    database :'mooovi',
    charset  :'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.login==null){
    res.render('index', { title: 'トップページ' });
  }
});

module.exports = router;
