const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
const scrapper = require('./scrapper')
// require('./collect')

const serviceAccount = require('./pricecatch-2589e-firebase-adminsdk-7nfxp-80397ee904.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pricecatch-2589e.firebaseio.com"
});
const db = admin.database();
const ref = db.ref("server/saved-data");
const productsRef = ref.child("products");

const router = express.Router();
const app = express();

router.post('/api/track', function(req, res) {
  if (req.body.url) {
    scrapper.getInfo(req.body.url, function(err, product, price) {
      if (err) return console.log(err);
      console.log(price);
      productsRef.push({
        product: product,
        price: price,
        url: req.body.url
      });
    })
  }
});

app.use(bodyParser.json());
const port = process.env.PORT || 8080;
app.use('/', router);
app.listen(port);
console.log(`Listening on ${port}`);

module.exports = app;
