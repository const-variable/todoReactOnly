import { combineReducers } from "redux";

const initialState = {
	lists: [
		// {
		// 	id: 1,
		// 	name: "Home",
		// 	tasks: [{ id: 1, name: "hello world task1", completed: false }]
		// }
	],
	selectedListId: null
};

const listReducer = (state = initialState, action) => {
	const currentListIndex = state.lists.findIndex(
		list => list.id == state.selectedListId
	);
	let newTasks;
	let updatedSelectedList;
	switch (action.type) {
		case "ADD_LIST":
			return { ...state, lists: [...state.lists, action.payload] };

		case "SELECT_LIST":
			return {
				...state,
				selectedListId: action.payload
			};

		case "ADD_TODO":
			let newObj = {
				...state.lists[currentListIndex],
				tasks: state.lists[currentListIndex].tasks.concat(action.payload)
			};

			return {
				...state,
				lists: [
					...state.lists.slice(0, currentListIndex),
					newObj,
					...state.lists.slice(currentListIndex + 1)
				]
			};

		case "DELETE_TODO":
			newTasks = state.lists[currentListIndex].tasks.filter(
				todo => todo.id !== action.payload
			);

			updatedSelectedList = {
				...state.lists[currentListIndex],
				tasks: newTasks
			};
			return {
				...state,
				lists: [
					...state.lists.slice(0, currentListIndex),
					updatedSelectedList,
					...state.lists.slice(currentListIndex + 1)
				]
			};

		case "TOGGLE_TODO":
			newTasks = state.lists[currentListIndex].tasks.map(task => {
				if (task.id == action.payload) {
					return { ...task, completed: !task.completed };
				} else {
					return task;
				}
			});

			updatedSelectedList = {
				...state.lists[currentListIndex],
				tasks: newTasks
			};

			return {
				...state,
				lists: [
					...state.lists.slice(0, currentListIndex),
					updatedSelectedList,
					...state.lists.slice(currentListIndex + 1)
				]
			};

		case "EDIT_TODO":
			newTasks = state.lists[currentListIndex].tasks.map(task => {
				if (task.id == action.payload.id) {
					return { ...task, name: action.payload.text };
				} else {
					return task;
				}
			});
			console.log("NEW TASKS", newTasks);

			updatedSelectedList = {
				...state.lists[currentListIndex],
				tasks: newTasks
			};

			return {
				...state,
				lists: [
					...state.lists.slice(0, currentListIndex),
					updatedSelectedList,
					...state.lists.slice(currentListIndex + 1)
				]
			};

		default:
			return state;
	}
};

export default combineReducers({
	listReducer
});
