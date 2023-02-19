const request = require('request-promise');
const cheerio = require('cheerio');

const fs = require('fs-extra');

const writeStream = fs.createWriteStream('elvirrey.csv')

async function init() {
    const $ = await request({
        // URL de la página a scrappear
        uri: 'https://www.elvirrey.com/libros-de/cine-0402/',
        transform: body => cheerio.load(body)
    });

    writeStream.write('Imagen|Libro|Autor|Status|Precio\n')

    $('.books li').each((i, el) => {
        const img = $(el).find('a img.foto').attr('src') || 'No hay imagen';
        /* const Link = $(el).find('dd.title a').attr('href') || 'Sin nombre'; */
        const libro = $(el).find('dd.title a').text().trim() || 'Sin Titulo';
        const autor = $(el).find('dd.creator').text().trim() || 'Sin AutorS';
        const status = $(el).find('dd.disponibilidad').text().trim() || 'Sin status';
        const precio = $(el).find('p.precio').text().trim() || 'Sin Precio'; 
        console.log(`${img}|${libro}|${autor}|${status}|${precio}`)
        writeStream.write(`${img}|${libro}|${autor}|${status}|${precio}\n`);
    })

}

init();
