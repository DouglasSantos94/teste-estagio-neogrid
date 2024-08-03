const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/', null, productController.getProductInfo);

module.exports = router;