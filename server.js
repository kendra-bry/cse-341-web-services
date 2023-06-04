const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const PORT = process.env.port || 3300;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log(`HTTP app now listening on port ${PORT}!`));
  }
});
