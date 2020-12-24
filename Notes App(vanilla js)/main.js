noteWraper = document.querySelector('.notes-wraper');
//notesEl = document.querySelector('.notes');
addNoteBtn = document.querySelector('.add-note');

if (localStorage.getItem('notes')) {
	const getNotes = JSON.parse(localStorage.getItem('notes'));
	getNotes.forEach((nt) => {
		createNote(nt);
	});
}

function createNote(text = '') {
	const note = document.createElement('div');
	note.classList.add('notes');
	note.innerHTML = `
		<div class="notes-tools">
		<button class="btn edit " id="edit"><i class="fa fa-edit"></i></button>
		<button class='btn  delete' id="delete"><i class="fa fa-trash"></i></button>
		</div>
		<div class="main ${text ? 'hidden':''}">
		</div>
		<textarea class='textarea ${text ? '':'hidden'}'></textarea>
	`;

	editBtn = note.querySelector('.edit');
	deleteBtn = note.querySelector('.delete');

	textarea = note.querySelector('textarea');
	textarea.value = text;

	main = note.querySelector('.main');
	main.innerText = textarea.value;

	editBtn.addEventListener('click', (e) => {
		e.target.parentElement.parentElement.parentElement.children[2].classList.toggle('hidden');
		e.target.parentElement.parentElement.parentElement.children[1].classList.toggle('hidden');
		// textarea.classList.toggle('hidden');
		// main.classList.toggle('hidden');
	});

	// Romove Note
	deleteBtn.addEventListener('click', (e) => {
		//e.target.parentElement.parentElement.parentElement.remove();
		//console.log(e.target);
		note.remove();
	});
	textarea.addEventListener('input', (e) => {
		const { value } = e.target;
		main.innerText = value;
		updateLS(note);
	});

	noteWraper.appendChild(note);
}

addNoteBtn.addEventListener('click', (e) => {
	createNote();
});

function updateLS() {
	const notes = [];
	const notesText = document.querySelectorAll('.textarea');

	notesText.forEach((note) => {
		if(! note == '' ){
			notes.push(note.value);
		}
	});

	localStorage.setItem('notes', JSON.stringify(notes));
}
