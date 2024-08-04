const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

router.use(express.urlencoded({
  extended: true
}));

router.get('/productInfo', productController.getProductInfo);
router.post('/productInfoCsv', productController.getProductInfoCsv);
router.get('/searchProduct', productController.searchProduct);

module.exports = router;