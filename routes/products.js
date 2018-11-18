var express = require('express');
var router = express.Router();

router.get('/add_review', (req, res, next) => {
  var data = {
    title: "レビューを投稿する"
  }
  res.render('products/add_review', data);
});

router.get('/search', (req, res, next) => {
  var data = {
    title: "映画を検索する"
  }
  res.render('products/search', data);
});

router.get('/:id', (req, res, next) => {
  var data = {
    title: "作品ページ"
  }
  res.render('products/show', data);
});

module.exports = router;
