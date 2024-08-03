const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/productInfo', productController.getProductInfo);

module.exports = router;