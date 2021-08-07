const cheerio = require('cheerio');
const express = require('express');
const request = require('request-promise');
const fetch = require('node-fetch');

// test

let app = express();
app.use(express.static('public'));
app.use(express.json());

// Scrape stuff from codeforces.com and return the contests found
app.get('/api/codeforces/upcoming-contests', async (req, res) => {
	let arrayOfContests = [];
	const response = await request.get('https://codeforces.com/contests');
	let $ = cheerio.load(response);
	$(
		'#pageContent > div.contestList > div.datatable > div:nth-child(6) > table > tbody > tr'
	).each((index, element) => {
		if (index === 0) return true; // Ignore the first row
		let contest = {};
		$('td', element).each((index, c) => {
			if (index === 0) {
				contest.name = $(c).text().replace(/\s+/g, ' ').trim();
			} else if (index === 2) {
				contest.dateTime = $(c).text().replace(/\s+/g, ' ').trim();
			} else if (index === 3) {
				contest.duration =
					$(c).text().replace(/\s+/g, ' ').trim() +
					'(days:hours:minutes)';
			} else if (index === 4) {
				contest.status = $(c).text().replace(/\s+/g, ' ').trim();
			} else if (index === 5) {
				contest.registerby =
					$(c).text().replace(/\s+/g, ' ').trim() + '(hh:mm:ss/days)';
			}
		});
		arrayOfContests.push(contest);
	});
	// console.log(arrayOfContests);
	res.json(arrayOfContests);
});

let a = [],
	b = [],
	c = [],
	d = [],
	e = [],
	f = [];

// Request and sort all problems from codeforces into divisions A<B<C<D<E<F
fetch('https://codeforces.com/api/problemset.problems')
	.then((data) => data.json())
	.then((data) => {
		return data.result.problems;
	})
	.then((questions) => {
		for (let i = 0; i < questions.length; i++) {
			switch (questions[i].index) {
				case 'A':
					a.push(questions[i]);
					break;
				case 'B':
					b.push(questions[i]);
					break;
				case 'C':
					c.push(questions[i]);
					break;
				case 'D':
					d.push(questions[i]);
					break;
				case 'E':
					e.push(questions[i]);
					break;
				case 'F':
					f.push(questions[i]);
					break;
			}
		}
		console.log(
			'Finished requesting and grouping questions: ' + questions.length
		);
	});

// Get relevant question sets
app.get('/api/codeforces/problem-set/:index', (req, res) => {
	let index = req.params.index;
	switch (index) {
		case 'a':
		case 'A':
			res.json(a);
			break;
		case 'b':
		case 'B':
			res.json(b);
			break;
		case 'c':
		case 'C':
			res.json(c);
			break;
		case 'd':
		case 'D':
			res.json(d);
			break;
		case 'e':
		case 'E':
			res.json(e);
			break;
		case 'f':
		case 'F':
			res.json(f);
			break;
	}
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
