const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const npmPath = path.join(__dirname, './node_modules');
const browserPath = path.join(__dirname, './browser');

// MIDDLEWARE LOGGER
app.use(morgan('dev'))


app.use(express.static('public'));
app.use(express.static(npmPath));
app.use(express.static(browserPath));

app.listen(3003, function () {
    console.log('Server is listening on port 3003!');
})
