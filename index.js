const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');

const username = 'rohank2205';

let app = express();
app.use(express.static('public'));
app.use(express.json());

app.listen(3000, () => {
	console.log('listening on port 3000');
});
