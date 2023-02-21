const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs-extra');

const writeStream = fs.createWriteStream('crisol.csv')

async function init() {
    const $ = await request({
        // URL de la página a scrappear
        uri: 'https://www.crisol.com.pe/',
        transform: body => cheerio.load(body)
    });

    writeStream.write('Imagen|Producto|Autor|Precio\n')

    $('.product-item-info').each((i, el) => {
        const img = $(el).find('img.product-image-photo ').attr('src') || 'No hay imagen';
        const producto = $(el).find('div.product strong a').text().trim() || 'Sin nombre';
        const autor = $(el).find('div.author').text().trim() || 'Sin Autor';
        const precio = $(el).find('span.price').text().trim() || 'Sin Precio';
        console.log(`${img}|${producto}|${autor}|${precio}`)
        writeStream.write(`${img}|${producto}|${autor}|${precio}\n`);
    })

}

init();

