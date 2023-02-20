const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');

const writeStream = fs.createWriteStream('thesun.csv')

async function init() {
    const $ = await request({
        // URL de la página a scrappear
        uri: 'https://www.thesun.co.uk/',
        transform: body => cheerio.load(body)
    });

    writeStream.write('Link|Imagen|Titulo|Descipcion|Tipo\n')

    $('.teaser-item').each((i, el) => { 
        /* console.log(el) */
        const link = $(el).find('a.teaser-anchor').attr('href') || 'No hay Link';
        const img = $(el).find('.teaser__image-container a picture source').attr('data-srcset') || 'No hay Link';
        const title = $(el).find('.teaser__copy-container a h3').text().trim() || 'No hay Titulo'; 
        const summary = $(el).find('.teaser__copy-container a p').text().trim() || 'No hay descripcion';
        const type = $(el).find('.teaser__social div.article-data__tag').text().trim() || 'No hay Tipo';  
        console.log(`${link}|${img}|${title}|${summary}|${type}`);
        writeStream.write(`${link}|${img}|${title}|${summary}|${type}\n`);
    })

}

init();
