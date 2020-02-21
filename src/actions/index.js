const addList = list => {
	return {
		type: "ADD_LIST",
		payload: list
	};
};

const selectList = id => {
	return {
		type: "SELECT_LIST",
		payload: id
	};
};

const addTodo = todo => {
	return {
		type: "ADD_TODO",
		payload: todo
	};
};

const deleteTodo = id => {
	return {
		type: "DELETE_TODO",
		payload: id
	};
};

const toggleTodo = id => {
	return {
		type: "TOGGLE_TODO",
		payload: id
	};
};

const editTodo = (id, text) => {
	console.log("Inside action", id, text);
	return {
		type: "EDIT_TODO",
		payload: {
			id,
			text
		}
	};
};

export { addList, selectList, addTodo, deleteTodo, toggleTodo, editTodo };
