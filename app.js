const express = require('express');
const app = express();

app.use(express.static('public'));

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: true });
app.use(parseUrlencoded);
app.use(express.json());

const movies = require('./routes/movies.js')

app.use('/', movies);

app.listen(3000, () => {
    console.log('listening on 3000');
});



