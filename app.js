const express = require('express');
const scraperRoutes = require('./routes/scraper');

const app = express();
app.use(express.json());

app.set('view engine', 'pug');

app.use("/", scraperRoutes);

app.listen(3000, () => {
  console.log('Aplicação em execução...');
});