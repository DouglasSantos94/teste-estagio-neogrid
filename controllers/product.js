const express = require('express');
const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');
const os = require('os');

const Product = require('../models/Product');

module.exports = {
    getProductInfo: async ({ body: { productUrl } }, res) => {
        const browser = await puppeteer.launch({ headless: "false" });
        
        const page = await browser.newPage();

        await page.goto(
          productUrl, {waitUntil: 'networkidle2'}
        );
        
        const content = await page.evaluate(() => {
          return document.querySelector(".showcase");
        });
            
        const description = await page.evaluate(() => {
          return content.querySelector(".features--description").textContent.trim();
        });
      
        const price = await page.evaluate(() => {
          return content.querySelector(".saleInCents-value").textContent.trim();
        });
      
        const title = await page.evaluate(() => {
          return content.querySelector(".product-name").textContent.trim();
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
        
        res.status(200).send(product);
        await page.close();
    },
    getProductInfoCsv: async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto("https://www.netshoes.com.br/p/creatina-max-titanium-monohidratada-natural-A05-4154-001");
      const content = await page.evaluate(() => {
        return document.querySelector(".showcase");
      });
          
      const description = await page.evaluate(() => {
        return content.querySelector(".features--description").textContent.trim();
      });
    
      const price = await page.evaluate(() => {
        return content.querySelector(".saleInCents-value").textContent.trim();
      });
    
      const title = await page.evaluate(() => {
        return content.querySelector(".product-name").textContent.trim();
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
    }
}