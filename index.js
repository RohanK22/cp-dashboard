const cheerio = require('cheerio');
const express = require('express');
const axios = require('axios');

const username = 'rohank2205';

let app = express();
app.use(express.static('public'));
app.use(express.json());

app.get('/api/codeforces/upcoming-contests', (req, res) => {
	axios.get('https://codeforces.com/contests').then((response) => {
		const $ = cheerio.load(response);
		let dataTableDiv = $('.datatable tr').text();
		console.log(dataTableDiv);
		res.send(dataTableDiv);
	});
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
