const request = require('request')
const cheerio = require('cheerio')

function getInfo(url, cb) {
  console.log('In getInfo');
  const options = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
  };
  request(options, (err, res, html) => {
    if (err) {
      return cb(err);
    }
    const $ = cheerio.load(html);
    const price = $('#priceblock_ourprice_row').find('#priceblock_ourprice').text();
    const product = $('#productTitle').text();
    if (price === null) {
      const price = $('.offer-price').text();
    }
    console.log('Done scrapping' + price);
    if (product === null) {
      return cb(err)
    }
    return cb(null, product, price);
  });
}

module.exports.getInfo = getInfo;
