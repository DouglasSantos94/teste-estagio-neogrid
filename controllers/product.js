const { extractProductInfo, convertProductToCsv } = require('../helpers/helpers');

module.exports = {
  getProductInfo: async ({ body: { productUrl } }, res) => {
    const product = await extractProductInfo(productUrl);

    res.status(200).send(product);
  },
  getProductInfoCsv: async ({ body: { productUrl } }, res) => {
    const product = await extractProductInfo(productUrl);

    const { errorMessage, filePath } = convertProductToCsv(product);

    res.status(errorMessage ? 500 : 200)
      .send(errorMessage 
        ? {errorMessage} 
        : {msg: `Sucesso: arquivo CSV salvo em: ${filePath}`});
  }
}