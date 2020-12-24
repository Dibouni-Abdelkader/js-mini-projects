// const submit = document.querySelector('form input[type="submit"]');
// const questionEl = document.querySelector('#q_text');
// const a_text = document.querySelector('.a');
// const b_text = document.querySelector('.b');
// const c_text = document.querySelector('.c');
// let currentQuize = 0;
// let score = 0;

// async function loadQuize() {
// 	const resp = await fetch('data.json');
// 	respData = await resp.json();

// 	let currentQuestion = respData[currentQuize];

// 	questionEl.innerText = currentQuestion.question;
// 	a_text.innerText = currentQuestion.a;
// 	b_text.innerText = currentQuestion.b;
// 	c_text.innerText = currentQuestion.c;
// 	data = respData;
// 	return respData;
// }

// loadQuize();

// function getSelected() {
// 	const answers = document.querySelectorAll('.answer');
// 	let result = undefined;
// 	answers.forEach((answer) => {
// 		if (answer.checked) {
// 			result = answer.value;
// 		}
// 	});
// 	return result;
// }
// submit.addEventListener('click', (e) => {
// 	//debugger;
// 	e.preventDefault();
// 	const answer = getSelected();

// 	if (answer) {
// 		if (answer === respData[currentQuize].corect) {
// 			score++;
// 			console.log('score=>', score);
// 			if (currentQuize < respData.length) {
// 				loadQuize();
// 			} else {
// 				document.querySelector('.quize').innnerHTML = `<h3>Your Score ${score}/${respData.length}</h3>`;
// 			}
// 		}
// 		currentQuize++;

// 		console.log('currentQuize =>', currentQuize);
// 		console.log('respData len =>', respData.length);
// 	}
// });

class UI {
	questionEl = document.querySelector('#q_text');
	a_text = document.querySelector('.a');
	b_text = document.querySelector('.b');
	c_text = document.querySelector('.c');
}

class QuizeApp {
	constructor() {
		this.score = 0;
		this.currentQuize = 0;
		this.currentQuestion = '';
		this.quizedata = null;
	}
	async loadQuizeData() {
		const resp = await fetch('data.json');
		const respData = await resp.json();
		return respData;
	}

	getSelected() {
		const answers = document.querySelectorAll('.answer');
		let result = undefined;
		answers.forEach((answer) => {
			if (answer.checked) {
				result = answer.value;
			}
		});
		return result;
	}
	clearSelected() {
		const answers = document.querySelectorAll('.answer');
		answers.forEach((answer) => {
			answer.checked = false;
		});
	}

	async loadUi() {
		this.clearSelected();
		this.quizedata = await this.loadQuizeData();
		this.currentQuestion = this.quizedata[this.currentQuize];

		const ui = new UI();
		ui.questionEl.innerText = this.currentQuestion.question;
		ui.a_text.innerText = this.currentQuestion.a;
		ui.b_text.innerText = this.currentQuestion.b;
		ui.c_text.innerText = this.currentQuestion.c;
	}
}

quizeapp = new QuizeApp();

quizeapp.loadUi();

const submit = document.querySelector('form input[type="submit"]');
submit.addEventListener('click', (e) => {
	e.preventDefault();

	let selected = quizeapp.getSelected();

	if (selected) {
		if (selected == quizeapp.quizedata[quizeapp.currentQuize].corect) {
			quizeapp.score++;
		}
		if (quizeapp.currentQuize < quizeapp.quizedata.length - 1) {
			quizeapp.loadUi();
		} else {
			document.querySelector(
				'.quize'
			).innerHTML = `<div class='score'><h2>Your Score Is: ${quizeapp.score}/${quizeapp.quizedata
				.length}</h2> <button onclick='location.reload()'>Reload</button></div>`;
		}

		quizeapp.currentQuize++;
	}
});
