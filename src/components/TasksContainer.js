import React, { Component } from "react";
import { connect } from "react-redux";

import "../App.css";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "../actions";

const strike = {
	textDecorationLine: "line-through",
	textDecorationStyle: "solid"
};

class TasksContainer extends Component {
	state = {
		inputText: ""
	};

	renderTasks = () => {
		// const list = this.props.lists.find(list => list.id == selectedListId);
		if (this.props.list.tasks && this.props.list.tasks.length == 0) {
			return <div>Please add some tasks</div>;
		}
		return (
			this.props.list &&
			this.props.list.tasks.map((task, index) => {
				return (
					<div key={task.id} className="task-container">
						<div className="mx-2">{index + 1}.</div>
						<input
							type="checkbox"
							checked={task.completed}
							id={task.id}
							onChange={() => this.toggleTodo(task.id)}
						/>
						<label
							className="mx-2 mb-0"
							style={task.completed == true ? strike : {}}
							contentEditable={!task.completed}
							onBlur={e => this.handleOnBlur(e, task.id)}
						>
							{task.name}
						</label>
						<button
							className="btn-delete"
							onClick={() => this.deleteTodo(task.id)}
						>
							Delete
						</button>
					</div>
				);
			})
		);
	};

	handleInputChange = e => {
		this.setState({
			inputText: e.target.value
		});
	};

	handleOnBlur = (e, id) => {
		this.props.editTodo(id, e.target.textContent);
	};

	addTask = e => {
		e.preventDefault();
		const task = {
			id: new Date().getTime().toString(),
			name: this.state.inputText,
			completed: false
		};

		this.props.addTodo(task);
		this.setState({ inputText: "" });
	};

	deleteTodo = id => {
		// const updatedTasks = this.props.list.tasks.filter(task => task.id !== id);
		this.props.deleteTodo(id);
	};

	toggleTodo = id => {
		this.props.toggleTodo(id);
	};

	// toggleCheck = id => {
	// 	const updatedTasks = this.props.list.tasks.map(task => {
	// 		if (task.id == id) {
	// 			return { id: task.id, name: task.name, completed: !task.completed };
	// 		}
	// 		return task;
	// 	});
	// 	this.props.updateList(updatedTasks);
	// };

	render() {
		// console.log(this.props.list.tasks);
		if (!this.props.list) {
			return <div>No tasks</div>;
		}
		return (
			<div className="m-2">
				<div className="m-2">
					<strong>Selected List:</strong> {this.props.list.name}
				</div>
				<form className="add-task-container" onSubmit={this.addTask}>
					<input
						type="text"
						value={this.state.inputText}
						onChange={this.handleInputChange}
					/>
					<button>Submit</button>
				</form>

				{this.props.list && this.renderTasks()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedListId: state.listReducer.selectedListId,
		lists: state.listReducer.lists
	};
}

export default connect(mapStateToProps, {
	addTodo,
	deleteTodo,
	toggleTodo,
	editTodo
})(TasksContainer);
