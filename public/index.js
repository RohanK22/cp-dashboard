const apiBaseUrl = 'https://cp-dashboard-rohan.herokuapp.com/api/';
let username = 'rohank2205';
const default_playlist = 'https://open.spotify.com/embed/playlist/37i9dQZEVXbLRQDuF5jeBp'
if(!localStorage.getItem('spotify-uri')) {
	localStorage.setItem("spotify-uri", default_playlist);
}

if(!localStorage.getItem('codeforces-username')) {
	localStorage.setItem("codeforces-username", username);
} 

const codeforcesEle = document.getElementById('codeforces');
username = localStorage.getItem('codeforces-username')

// Refresh on handle change
const displayHandleEle = document.getElementById('handle');
displayHandleEle.onchange = () => {
	localStorage.setItem('codeforces-username', displayHandleEle.value)	
	location.reload()	
}

// Set user info
fetch('https://codeforces.com/api/user.rating?handle=' + username)
	.then((response) => response.json())
	.then((data) => {
		const displayHandleEle = document.getElementById('handle');
		const currentRatingEle = document.getElementById('current-rating');
		const contestDisplay = document.getElementById('contests-attended');

		displayHandleEle.value = data.result[0].handle;
		displayHandleEle.setAttribute(
			'href',
			'https://codeforces.com/profile/' + username
		);
		
		// set user rating
		currentRatingEle.textContent =
			'Current User Rating: ' +
			data.result[data.result.length - 1].newRating;
		
		// constest info
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
				newDiv.setAttribute('class', 'question')
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

function getRandomQuestion() {
	// Fetch questions with particular index/division
	const questionsDiv = document.getElementsByClassName('question');
	let randomIndex = Math.floor(Math.random() * questionsDiv.length)
	const randomDiv = questionsDiv.item(randomIndex)
	const randomQuestionDiv = document.getElementById('random-question')
	
	// Remove any questions present before
	while (randomQuestionDiv.firstChild) {
        randomQuestionDiv.removeChild(randomQuestionDiv.firstChild);
    }
	
	randomQuestionDiv.innerHTML = randomDiv.innerHTML
}

const spotifyPlayerLink = document.getElementById('link')
const frame = document.createElement('div')
frame.innerHTML = '<iframe src="' + localStorage.getItem('spotify-uri') + '" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'

spotifyPlayerLink.setAttribute('value', localStorage.getItem('spotify-uri'))

document.getElementById('spotify-sidebar').appendChild(frame)

spotifyPlayerLink.onchange = () => {
	localStorage.setItem('spotify-uri', spotifyPlayerLink.value)	
	location.reload()	
}