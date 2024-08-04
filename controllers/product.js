const fs = require('fs');
const path = require('path');
const extractProductInfo = require('../helpers/extractProductInfo');
const os = require('os');


module.exports = {
    getProductInfo: async ({ body: { productUrl } }, res) => {
        const product = await extractProductInfo(productUrl);

        res.status(200).send(product);
    },
    getProductInfoCsv: async ({ body: { productUrl } }, res) => {
      const product = await extractProductInfo("https://www.netshoes.com.br/p/creatina-max-titanium-monohidratada-natural-A05-4154-001");

      const csvContent = [
        ['Name', 'Price', 'Description', 'Image'],
        [product.title, product.price, product.description, product.image]
      ].map(e => e.join(';')).join('\n');
      const csvDirectoryPath = `${os.homedir()}/csv`;
      if(!fs.existsSync(csvDirectoryPath)) {
        fs.mkdirSync(csvDirectoryPath);
      }
      const filePath = path.join(`${os.homedir()}/csv`, 'data.csv');
      fs.writeFile(filePath, csvContent, (err) => {
        if(err) 
          console.error('Erro');
        else
          console.log('csv salvo: ', filePath);

      })
      await browser.close();
      res;
    }
}