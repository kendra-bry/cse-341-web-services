const cors = require('cors');
const chalk = require('chalk');
const express = require('express');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.port || 3300;
const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./routes'));

mongodb.initDb((err, db) => {
  console.log(swaggerDocument);
  if (err) {
    console.log(err);
  } else {
    let logMessage = `HTTP app now listening on port ${PORT}.`;
    console.log({ NODE_ENV: process.env.NODE_ENV });
    if (process.env.NODE_ENV === 'DEV') {
      const url = `http://localhost:${PORT}/api-docs`;
      const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
      logMessage += ` ${chalk.blue(link)}`;
    }
    app.listen(PORT, () => console.log(logMessage));
  }
});
