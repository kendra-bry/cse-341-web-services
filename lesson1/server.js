const express = require('express');
const PORT = process.env.port || 3300;
const app = express();

app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`HTTP app now listening on port ${PORT}!`));
