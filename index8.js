const request = require('request-promise');
const cheerio = require('cheerio');

async function init() {
    const $ = await request({
        // URL de la página a scrappear
        uri: 'https://www.thesun.co.uk/sport/football/',
        transform: body => cheerio.load(body)
    });

    $('div.teaser-item').each((i, el) => { /* $x('//div[@class="title-section"]/text()').map(x => x.value) */
        //div[@class="results | space-y-3 "]/ul/li/div
        const link = $(el).find('div.teaser__copy-container a').attr('href') || 'No hay imagen'; 
        const titulo = $(el).find('div.teaser__copy-container a h3').text().trim() || 'Sin titulo';  
        const descripcion = $(el).find('div.teaser__copy-container a p').text().trim() || 'Sin descripcion';
        const type = $(el).find('div.teaser__social div.article-data__tag').text().trim() || 'No hay Tipo'; 
        const img = $(el).find('div.teaser__image-container a picture source').attr('data-srcset') || 'No hay Link';
        console.log(`${link}|${titulo}|${descripcion}|${type}|${img}`)
    })

}

init();
