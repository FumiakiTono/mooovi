var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res, next) => {
  var data = {
    title: "新規登録"
  }
  res.render('users/signup', data);
});

router.get('/signin', (req, res, next) => {
  var data = {
    title: "ログイン"
  }
  res.render('users/signin', data);
});

router.get('/:id', (req, res, next) => {
  var data = {
    title: "マイページ"
  }
  res.render('users/show', data);
});

module.exports = router;
