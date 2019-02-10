var express = require('express');
var router = express.Router();


var product = require('../model/product');
var review = require('../model/review');
var user = require('../model/user');

router.get('/', (req, res, next) => {
  console.log(collection);
  new product().where('title', 'like', '%' + req.query.title + '%').fetch()
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
