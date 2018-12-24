var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var knex = require('knex')({
  dialect: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mooovi_express',
    charset: 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

var Product = Bookshelf.Model.extend({
  tableName: 'products'
});

var Review = Bookshelf.Model.extend({
  tableName: 'reviews',
  hasTimestamps: true,
  product: function(){
    return this.belongsTo(Product);
  },
  user: function(){
    return this.belongsTo(User);
  }
});

router.get('/:id/add_review', (req, res, next) => {
  var data = {
    title: "レビューを投稿する",
    // idを渡す必要ある？別の方法があるのでは。
    id: req.params.id
  }
  res.render('products/add_review', data);
});

router.post("/add_review", (req, res, next) => {
  console.log(req.session.login);
  var record = {
    product_id: req.body.id,
    rate: req.body.rate,
    review: req.body.review,
    user_id: req.session.login.id
  }
  // console.log(record);

  new Review(record).save().then((model) => {
    res.redirect("/");
  });
});

router.get('/search', (req, res, next) => {
  var data = {
    title: "映画を検索する",
    collection: ""
  }
  res.render('products/search', data);
});

// router.post('/search', (req, res, next) => {
//   new Product().where('title', 'like', '%' + req.body.title + '%').fetch().
//       then((collection) => {
//         console.log(collection);
//         var data = {
//           title: "映画を検索する",
//           collection: collection
//         };
//         console.log(data);
//         res.render("products/search", data);
//       })
// });

router.get('/:id', (req, res, next) => {
  new Review().where('product_id', '=', req.params.id).fetchAll({withRelated: ['product']}).
    then((collection) => {
      var data = {
        title: "検索ページ",
        collection: collection.toArray()
      };
      // console.log(collection[0].relations.user)
      res.render('products/show', data);
    })
});

module.exports = router;
