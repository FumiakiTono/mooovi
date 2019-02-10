var express = require('express');
var router = express.Router();

var controller = require('../controller/product_controller');

router.get('/:id/add_review', controller.new);

router.post("/add_review", controller.add_review);

router.get('/search', controller.search);

// router.post('/search', controller.search_post);

router.get('/:id', controller.show);

module.exports = router;
