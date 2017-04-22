const request = require('request')
const cheerio = require('cheerio')

function getInfo(url, cb) {
  request(url, (err, res, html) => {
    if (err) {
      return cb(err, null);
    }
    const $ = cheerio.load(html);
    const price = $('#priceblock_ourprice_row').find('#priceblock_ourprice').text();
    const img = $('#landingImage').attr('src');
    return cb(null, price, img);
  });
}

module.exports.getInfo = getInfo;
