const fs = require('fs');
const path = require('path');
const extractProductInfo = require('../helpers/extractProductInfo');
const os = require('os');


module.exports = function convertProductToCsv(product) {
  const csvContent = [
    ['Name', 'Price', 'Image', 'Description'],
    Object.values(product)
  ].map(e => e.join(';')).join('\n');

  const csvDirectoryPath = `${os.homedir()}/csv`;

  if(!fs.existsSync(csvDirectoryPath)) {
    fs.mkdirSync(csvDirectoryPath);
  }

  const filePath = path.join(`${os.homedir()}/csvds`, 'data.csv');
  
  let errorMessage = '';

  try {
    fs.writeFile(filePath, csvContent, (err) => {
      if(err) {
        errorMessage = 'Ocorreu um erro no processamento!';
      }
    });
  } catch(e) {
    console.error(e);
  }

  return { errorMessage, filePath };
}