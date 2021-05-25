const apiBaseUrl = 'http://localhost:3000/api/';
const username = 'rohank2205';

const codeforcesEle = document.getElementById('codeforces');

// Set user info
fetch('https://codeforces.com/api/user.rating?handle=' + username)
	.then((response) => response.json())
	.then((data) => {
		const displayHandleEle = document.createElement('h2');
		const currentRatingEle = document.createElement('h3');
		const contestDisplay = document.createElement('div');

		displayHandleEle.textContent = data.result[0].handle;
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
				'      Rank: ' +
				data.result[contest].rank;
			contestDisplay.appendChild(pTag);
		}

		// Add all children
		codeforcesEle.appendChild(displayHandleEle);
		codeforcesEle.appendChild(currentRatingEle);
		const tTag = document.createElement('h3');
		tTag.textContent = 'Contests Attended';
		codeforcesEle.append(tTag);
		codeforcesEle.appendChild(contestDisplay);
	})
	.catch((error) => {
		console.log('Error Occoured: ' + error);
	});

// Set Upcoming cosntests list with time left in hrs
fetch(apiBaseUrl + 'codeforces/upcoming-contests').then((data) =>
	console.log(data)
);
