const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs-extra');

const writeStream = fs.createWriteStream('books.csv')

// URL de la página a la que haremos scraping
const url = 'http://books.toscrape.com/';

// Hacemos una solicitud HTTP a la página con la librería request
request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    // Cargamos el contenido HTML de la respuesta en Cheerio
    const $ = cheerio.load(html);
    
    writeStream.write('Titulo|precio|Stock\n')

    // Obtenemos los detalles de cada libro
    $('.product_pod').each((i, el) => {
      const title = $(el).find('h3 a').attr('title');
      const price = $(el).find('.price_color').text().replace(/(^\Â|\£$)/g,"");
      const stock = $(el).find('.availability').text().trim();
      console.log(`${title} | ${price} | ${stock}`);
      writeStream.write(`${title}|${price}|${stock}\n`)
    });
  } else {
    console.log(error);
  }
});