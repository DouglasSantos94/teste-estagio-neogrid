const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.get('/productInfo', productController.getProductInfo);
router.get('/productInfoCsv', productController.getProductInfoCsv);

module.exports = router;