const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');

const writeStream = fs.createWriteStream('ebooks.csv')


async function init() {
    const $ = await request({
        uri: 'https://www.buscalibre.pe/',
        transform: body => cheerio.load(body)
    });

    writeStream.write('Libro|Autores|Ventas|Precio\n')

    $('.box-producto').each((i, el) => {
        const title = $(el).find('h3.nombre').text();
        const autor = $(el).find('.metas').text();
        const autores = autor.replace(/(\r\n|\n|\r)/g,'');
        /* const rating = $(el).find('span.small starts').text(); */
        const ventas =  $(el).find('span.font-size-small').text() || '0';
        const price = $(el).find('p.precio-ahora').text();
        console.log(`${title}|${autores}|${ventas}|${price}\n`);
        writeStream.write(`${title}|${autores}|${ventas}|${price}\n`);
    })

}

init();