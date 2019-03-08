import moment from 'moment';

export function setPropertyTodo(id, todos, property) {
	return todos.map((todo) => {
		if (todo.id === id) {
			return { ...todo, ...property };
		}

		return todo;
	});
};

export function setActiveTodo(id, todos) {
	return setPropertyTodo(id, todos, { active: true })
};

export function setInactiveTodo(id, todos) {
	return setPropertyTodo(id, todos, { active: false });
};

export function findAllTodosInDate(date, todos) {
	if (!moment(date).isValid()) {
		console.error('findAllTodosInDate should receive date moment object');
		return [];
	}

	return todos.map((todo) => {
		if (moment(todo.date).format('MM/DD/YYYY') === moment(date).format('MM/DD/YYYY')) {
			return todo;
		}

		return null;
	}).filter((todo) => todo);
};

export function removeTodoFromList(id, todos) {
	const newListOfTodo = [];
	todos.forEach((globalTodo) => {
		if (globalTodo.id !== id) {
			newListOfTodo.push(globalTodo);
		}
	});

	return newListOfTodo;
};

export function generateId() {
	return Math.floor(Math.random()*90000) + 10000;
};