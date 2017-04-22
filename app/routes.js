const express = require('express');
const router = express.Router();
const scrapper = require('scrapper')

router.get('/api/scrape', function(req, res) {
  if (req.url) {
    scrapper.getInfo(req.url, function(err, price, img) {
      if (err) return err;
      res.json({ price, img })
    })
  }
});

module.exports = router;
