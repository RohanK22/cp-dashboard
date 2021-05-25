const apiBaseUrl = 'http://localhost:3000/api/';
const username = 'rohank2205';
// Set user info
fetch('https://codeforces.com/api/user.rating?handle=' + username)
	.then((response) => response.json())
	.then((data) => {
		const codeforcesEle = document.getElementById('codeforces');
		const displayHandleEle = document.createElement('h2');
		const currentRatingEle = document.createElement('h3');
		const contestDisplay = document.createElement('div');

		displayHandleEle.textContent = data.result[0].handle;
		currentRatingEle.textContent =
			'Current User Rating: ' +
			data.result[data.result.length - 1].newRating;
		data.result = data.result.reverse();
		console.log(data.result);
		for (let contest = 0; contest < data.result.length; contest++) {
			let pTag = document.createElement('p');
			pTag.textContent =
				contest + 1 + '. ' + data.result[contest].contestName;
			contestDisplay.appendChild(pTag);
		}

		// Add all children
		codeforcesEle.appendChild(displayHandleEle);
		codeforcesEle.appendChild(currentRatingEle);
		codeforcesEle.appendChild(contestDisplay);
	})
	.catch((error) => {
		console.log('Error Occoured: ' + error);
	});
