const fs = require('fs');
const path = require('path');
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

  const filePath = path.join(`${os.homedir()}/csv`, 'data.csv');
  
  fs.writeFile(filePath, csvContent, (err) => {
    if(err) {
      console.error(err);
    }
  });
  
  return filePath;
}