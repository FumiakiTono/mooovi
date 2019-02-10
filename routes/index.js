var express = require('express');
var router = express.Router();

var controller = require('../controller/product_controller');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
