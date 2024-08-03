const express = require('express');
const puppeteer = require("puppeteer");
const Product = require('./models/Product');

modules.exports = {
    getProductInfo: async ({ body: { productUrl } }, res) => {
        const browser = await puppeteer.launch({ headless: "new" });
        
        const page = await browser.newPage();
        const url = productUrl;
        
        await page.goto(
          url
        );
      
        const content = await page.evaluate(() => {
          return document.querySelector(".showcase");
        });
      
        await page.waitForNetworkIdle();
      
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
        browser.close();
      
        res.status(200).send(product);
      }
}