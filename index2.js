
const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function main() {
  const response = await fetch('https://mx.investing.com/crypto'),
      html = await response.text();

  const $ = cheerio.load(html)
  let cryptos = [],
  crypto = [];
  const tbody = $('tbody').find('tr').toArray();

  for(let tr of tbody) {
    crypto = [];
    tr = $(tr).find('td').filter((i, elem) => $(elem).text()).toArray();

    for(let td of tr) {
      crypto.push($(td).text());
    }
    cryptos.push(crypto);
  }
  console.table(cryptos);
}

setInterval(() => main(), 1500);