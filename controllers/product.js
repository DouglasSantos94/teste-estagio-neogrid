const { extractProductInfo, convertProductToCsv } = require('../helpers/helpers');

module.exports = {
  getProductInfo: async ({ body: { productUrl } }, res) => {
    try {

      const product = await extractProductInfo(productUrl);
      
      res.status(200).send(product);
    } catch(e) {
      console.error(e);
      res.status(500).send({ errorMessage: "Ocorreu um erro durante o processamento!" });
    }
  },
  productInfoCsv: async ({ body: { productUrl } }, res) => {
    try {

      const product = await extractProductInfo(productUrl);
      const filePath = convertProductToCsv(product);
      
      res.status(200).send({ msg: `Sucesso: arquivo CSV salvo em: ${filePath}` });
    } catch(e) {
      console.error(e);
      res.status(500).send({ errorMessage: 'Ocorreu um erro durante o processamento!' });
    }
  },
  searchProduct: (req, res) => {
    res.render('searchProduct');
  }
}