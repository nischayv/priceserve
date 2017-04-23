const admin = require('firebase-admin');

const serviceAccount = require('pricecatch-2589e-firebase-adminsdk-7nfxp-80397ee904.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pricecatch-2589e.firebaseio.com"
});
const db = admin.database();
const ref = db.ref("server/saved-data/products");

module.exports = () => {
  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

setInterval(function() {
  collect();
}, 1000 * 3600);
