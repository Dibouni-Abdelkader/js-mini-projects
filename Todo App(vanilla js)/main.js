const taskEl = document.querySelector('input');
const form = document.querySelector('form');
const tasksWrapEl = document.querySelector('.todos');

class TodosApp {
	constructor() {
		this.newTask = '';
		this.tasks = [];
	}

	displayTasks() {
		let Li = document.createElement('li');
		Li.classList.add('todo-item');
		Li.innerText = this.newTask;
		tasksWrapEl.appendChild(Li);
		this.newTask = '';
	}
	updataLS(task) {
		if (task) {
			this.tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
		}
	}
	showTaskLS() {
		const tasks = JSON.parse(localStorage.getItem('tasks'));

		if (tasks) {
			tasks.forEach((task) => {
				let Li = document.createElement('li');
				Li.classList.add('todo-item');
				Li.innerText = task;
				tasksWrapEl.appendChild(Li);
			});
		}
	}
	deleteTask(task) {
		const tasks = JSON.parse(localStorage.getItem('tasks'));
		const resultTasks = tasks.filter((item) => {
			return item != task;
		});
		console.log(resultTasks);
		localStorage.setItem('tasks', JSON.stringify(resultTasks));
	}
}

todo = new TodosApp();
todo.showTaskLS();
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const { value } = taskEl;
	if (value) {
		todo.newTask = value;
		todo.updataLS(todo.newTask);
		this.tasks = [];
		todo.displayTasks();
	}
	taskEl.value = '';
});
tasksWrapEl.addEventListener('click', (e) => {
	if (e.target.classList.contains('todo-item')) {
		e.target.remove();
		console.log(e.target);
		todo.deleteTask(e.target.innerText);
	}
});
