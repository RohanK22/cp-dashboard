const apiBaseUrl = 'http://localhost:3000/api/';
const username = 'rohank2205';

const codeforcesEle = document.getElementById('codeforces');

// Set user info
fetch('https://codeforces.com/api/user.rating?handle=' + username)
	.then((response) => response.json())
	.then((data) => {
		const displayHandleEle = document.getElementById('handle');
		const currentRatingEle = document.getElementById('current-rating');
		const contestDisplay = document.getElementById('contests-attended');

		displayHandleEle.textContent = data.result[0].handle;
		displayHandleEle.setAttribute(
			'href',
			'https://codeforces.com/profile/' + username
		);
		currentRatingEle.textContent =
			'Current User Rating: ' +
			data.result[data.result.length - 1].newRating;
		data.result = data.result.reverse();
		for (let contest = 0; contest < data.result.length; contest++) {
			let pTag = document.createElement('p');
			pTag.textContent =
				contest +
				1 +
				'. ' +
				data.result[contest].contestName +
				' Rank: ' +
				data.result[contest].rank;
			contestDisplay.appendChild(pTag);
		}
	})
	.catch((error) => {
		console.log('Error Occoured: ' + error);
	});

// Set Upcoming cosntests list with time left in hrs
fetch(apiBaseUrl + 'codeforces/upcoming-contests')
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		const upcomingContestsEle =
			document.getElementById('upcoming-contests');
		const tTag = document.createElement('h3');
		tTag.textContent = 'Upcoming Contests';
		upcomingContestsEle.appendChild(tTag);
		let i = 1;
		for (let c = 0; c < data.length; c++) {
			let contest = data[c];
			let newContestDiv = document.createElement('p');
			newContestDiv.textContent =
				i++ +
				'. Name: ' +
				contest.name +
				' Date time: ' +
				contest.dateTime +
				// ' Duration: ' +
				// contest.duration +
				// ' Status: ' +
				// contest.status +
				' Registration by/Status: ' +
				contest.registerby;

			upcomingContestsEle.appendChild(newContestDiv);
		}
	});

// Display problems to solve
// let timeOut = window.setTimeout(() => {
// 	setQuestions('A');
// }, 3000);
// window.clearTimeout(timeOut);

setQuestions('A');

function setQuestions(index) {
	const questionsDiv = document.getElementById('questions');
	const qWrap = document.createElement('div');
	qWrap.setAttribute('id', 'qs');

	// Remove previous questions
	const pQs = document.getElementById('qs');
	if (questionsDiv.lastChild === pQs) {
		questionsDiv.removeChild(pQs);
	}

	fetch(apiBaseUrl + 'codeforces/problem-set/' + index)
		.then((response) => response.json())
		.then((data) => {
			for (let d = 0; d < data.length; d++) {
				let newDiv = document.createElement('div');
				newDiv.innerHTML = `<p>${
					d + 1
				}. <a href="https://codeforces.com/contest/${
					data[d].contestId
				}/problem/${index}">${data[d].name}</a> (${data[d].points}) - ${
					data[d].tags
				} </p>`;
				qWrap.appendChild(newDiv);
			}
			questionsDiv.appendChild(qWrap);
			console.log('Loaded ' + data.length + '  questions!');
		});
}
