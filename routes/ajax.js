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

var Product = Bookshelf.Model.extend({
  tableName: 'products'
});


router.get('/', (req, res, next) => {
  console.log(collection);
  new Product().where('title', 'like', '%' + req.query.title + '%').fetch()
    .then((collection) => {
      console.log(collection);
      var data = {
        title: collection
        // collection: collection
      }
  })
  res.sendFile(data);
});

module.exports = router;
