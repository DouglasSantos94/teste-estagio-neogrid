const puppeteer = require('puppeteer');

const Product = require('../models/Product');

module.exports = async function extractProductInfo (productUrl) {
  const browser = await puppeteer.launch({ headless: 'false' });
  
  const page = await browser.newPage();

  await page.goto(
    productUrl, {waitUntil: 'networkidle2'}
  );
  
  const content = await page.evaluate(() => {
    return document.querySelector('.showcase');
  });
      
  const description = await page.evaluate(() => {
    return content.querySelector('.features--description').textContent.trim();
  });

  const price = await page.evaluate(() => {
    return content.querySelector('.saleInCents-value').textContent.trim();
  });

  const title = await page.evaluate(() => {
    return content.querySelector('.product-name').textContent.trim();
  });

  const image = await page.evaluate(() => {
    return content.querySelector('img.float-buybox-wrap-product__image').src;
  });
  
  const product =  new Product(
    title,
    price,
    image,
    description
  );
  
  await page.close();

  return product;
}
