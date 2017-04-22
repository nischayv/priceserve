const express = require('express');
const routes = require('./app/routes');
const bodyParser = reqire('bodyParser')

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
app.use('/', routes);
app.listen(port);

console.log(`Listening on ${port}`);
module.exports = app;
