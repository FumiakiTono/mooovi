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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res, next) => {
  var data = {
    title: "新規登録",
    form: {email: '', password: '', nickname: ''},
    content: ""
  }
  res.render('users/signup', data);
});

router.post('/add', (req, res, next) => {
  var request = req;
  var response = res;
  // バリデーション
  req.check('email', "emailは必ず入力して下さい。").notEmpty();
  req.check('password', "PASSWORDは必ず入力して下さい。").notEmpty();
  req.getValidationResult().then((result) => {
    if(!result.isEmpty()){

      // 文字列型はプリミティブ型なので値渡し
      var content = '<ul class="error">';
      // var content2 = content;
      // content2 = 'hoge'
      // console.log(content);
      // console.log(content2);

      var result_arr = result.array();
      console.log(result_arr);

      for(var n in result_arr){
        content += '<li>' + result_arr[n].msg + '</li>'
      }
      content += '</li>';
      var data = {
        title: '新規登録',
        content: content,
        form: req.body
      }
      response.render('users/signup', data);
    } else {
      request.session.login = null;
      new User(req.body).save().then((model) => {
        response.redirect('/');
      });
    }
  })

});


router.get('/signin', (req, res, next) => {
  var data = {
    title: "ログイン",
    content: ""
  }
  res.render('users/signin', data);
});

router.post('/signin', (req, res, next) => {
  var request = req;
  var response = res;
  // バリデーション
  req.check('email', "emailは必ず入力して下さい。").notEmpty();
  req.check('password', "PASSWORDは必ず入力して下さい。").notEmpty();
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      var content = '<ul class="error">';
      var result_arr = result.array();

      // バリデーションエラーにひっかかったとき
      // result_arrはオブジェクト型の配列なので参照渡し
      // console.log(result_arr);
      // result_arr2 = result_arr
      // result_arr[0] = "hogehoge"
      // console.log(result_arr);
      // console.log(result_arr2);

      for(var n in result_arr){
        content += '<li>' + result_arr[n].msg + '</li>'
      }
      content += '</ul>';
      var data = {
        title: 'Login',
        content: content,
        form: req.body
      }
      response.render('users/signin', data);
    } else {
      var em = req.body.email;
      var pw = req.body.password;

      User.query({where: {email: em}, andWhere: {password: pw}})
            .fetch()
            .then((model) => {
              if (model == null){
                  var data = {
                    title: '再入力',
                    content:'<p class="error">名前またはパスワードが違います。</p>',
                    form: req.body
                  };
                  response.render('users/signin', data);
              } else {
                request.session.login = model.attributes;
                var data = {
                  title: 'Login',
                  content: '<p>ログインしました！</p>',
                  form: req.body,
                  collection: ""
                };
                response.render('index', data);
              }
      });
    }
  })
});

// ログアウト、sessionの使い方合っているか？
router.get('/signout', (req, res, next) => {
  var request = req;
  var response = res;
  // console.log(req.session);
  req.session.login = null;
  // console.log(req.session);
  var data = {
    title: 'Signout',
    content: '<p>ログアウトしました！</p>',
    form: req.body
  };
  response.render('users/signin', data);
});


router.get('/:id', (req, res, next) => {
  var data = {
    title: "マイページ"
  }
  res.render('users/show', data);
});


module.exports = router;
