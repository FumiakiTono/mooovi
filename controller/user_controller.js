var Product = require('../model/product');
var Review = require('../model/review');
var User = require('../model/user');

// オブジェクト指向の継承とか使えそう
function user_controller(){};

user_controller.signup = (req, res, next) => {
  user = new User();
  data = user.signup_data();
  res.render('users/signup', data);
}

user_controller.add = (req, res, next) => {
  var request = req;
  var response = res;
  user = new User();
  // バリデーション
  req.check('email', "emailは必ず入力して下さい。").notEmpty();
  req.check('password', "PASSWORDは必ず入力して下さい。").notEmpty();
  req.getValidationResult().then((result) => {
    if(!result.isEmpty()){
      var result_arr = result.array();
      console.log(result_arr);
      data = user.add_data(req, result_arr);
      response.render('users/signup', data);
    } else {
      request.session.login = null;
      new User(req.body).save().then((model) => {
        response.redirect('/');
      });
    }
  })
}

user_controller.signin = (req, res, next) => {
  user = new User();
  data = user.signin_data();
  res.render('users/signin', data);
}

user_controller.signin_post =  (req, res, next) => {
  var request = req;
  var response = res;
  user = new User();
  // バリデーション
  req.check('email', "emailは必ず入力して下さい。").notEmpty();
  req.check('password', "PASSWORDは必ず入力して下さい。").notEmpty();
  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      var result_arr = result.array();
      // バリデーションエラーにひっかかったとき
      // result_arrはオブジェクト型の配列なので参照渡し
      // console.log(result_arr);
      // result_arr2 = result_arr
      // result_arr[0] = "hogehoge"
      // console.log(result_arr);
      // console.log(result_arr2);

      data = user.signin_post_data(req, result_arr);
      response.render('users/signin', data);
    } else {
      var em = req.body.email;
      var pw = req.body.password;

      user.query({where: {email: em}, andWhere: {password: pw}})
            .fetch()
            .then((model) => {
              if (model == null){
                  data = user.signin_post_data_error(req);
                  response.render('users/signin', data);
              } else {
                request.session.login = model.attributes;
                data = user.signin_post_data_success(req);
                response.render('index', data);
              }
      });
    }
  })
}

user_controller.signout = (req, res, next) => {
  var request = req;
  var response = res;
  user = new User();
  // console.log(req.session);
  req.session.login = null;
  // console.log(req.session);
  data = user.signout_data(req);
  response.render('users/signin', data);
}

user_controller.show = (req, res, next) => {
  user = new User();
  data = user.show_data();
  res.render('users/show', data);
}

module.exports = user_controller;
