var Product = require('../model/product');
var Review = require('../model/review');
var User = require('../model/user');

// オブジェクト指向の継承とか使えそう
function product_controller(){};

product_controller.new = (req, res, next) => {
  product = new Product();
  data = product.new_data(req);
  // console.log(data);
  res.render('products/add_review', data);
}

product_controller.add_review = (req, res, next) => {
  console.log(req.session.login);

  product = new Product();
  product.escape_review(req);
  req.sanitize
  record = product.add_review_data(req);
  // console.log(record);
  new Review(record).save().then((model) => {
    res.redirect("/");
  });
}

product_controller.search = (req, res, next) => {
  console.log(0);
  // var product = new Product();
  console.log(1);
  product = new Product();
  data = product.search_data(req);
  res.render('products/search', data);
}

// product_controller.search_post = (req, res, next) => {
//   new Product().where('title', 'like', '%' + req.body.title + '%').fetch().
//       then((collection) => {
//         console.log(collection);
//         data = search_data_post(collection);
//         console.log(data);
//         res.render("products/search", data);
//       })
// }

product_controller.show = (req, res, next) => {
  new Review().where('product_id', '=', req.params.id).fetchAll({withRelated: ['product']}).
    then((collection) => {
      product = new Product();
      data = product.show_data(collection);
      res.render('products/show', data);
    })
}

product_controller.index = function(req, res, next) {
  product = new Product();
  new Product().fetchAll().then((collection) => {
    data = product.index_data(req, collection)

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
}

module.exports = product_controller;
