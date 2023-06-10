const chalk = require('chalk');
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
    const url = `http://localhost:${PORT}/contacts`;
    const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
    app.listen(PORT, () => console.log(`HTTP app now listening on port ${PORT}. ${chalk.blue(link)}`));
  }
});
