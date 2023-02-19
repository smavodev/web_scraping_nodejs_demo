const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs-extra');

const writeStream = fs.createWriteStream('ebooks.csv')

async function init() {
    const $ = await request({
         // URL de la página a scrappear
        uri: 'https://www.buscalibre.pe/',
        transform: body => cheerio.load(body)
    });

    writeStream.write('Libro|Autores|Ventas|Precio\n')

    $('.box-producto').each((i, el) => {
        const title = $(el).find('h3.nombre').text() || 'No hay Titulo';
        const autor = $(el).find('.metas').text() || 'No hay Autor';
        const autores = autor.trim();
        /* const rating = $(el).find('span.small starts').text(); */
        const ventas =  $(el).find('span.font-size-small').text() || '0';
        const price = $(el).find('p.precio-ahora').text() || 'S/ 0.00';
        console.log(`${title}|${autores}|${ventas}|${price}`);
        writeStream.write(`${title}|${autores}|${ventas}|${price}\n`);
    })

}

init();