var express = require('express');
var router = express.Router();

var controller = require('../controller/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', controller.signup);

router.post('/add', controller.add);


router.get('/signin', controller.signin);

router.post('/signin', controller.signin_post);

// ログアウト、sessionの使い方合っているか？
router.get('/signout', controller.signout);


router.get('/:id', controller.show);


module.exports = router;
