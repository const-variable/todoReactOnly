import React, { Component } from "react";

import "../App.css";

const strike = {
	textDecorationLine: "line-through",
	textDecorationStyle: "solid"
};

class TasksContainer extends Component {
	state = {
		inputText: ""
	};

	renderTasks = () => {
		if (this.props.list.tasks.length == 0) {
			return <div>Please add some tasks</div>;
		}
		return this.props.list.tasks.map((task, index) => {
			return (
				<div key={task.id} className="task-container">
					<div className="mx-2">{index + 1}.</div>
					<input
						type="checkbox"
						checked={task.completed}
						id={task.id}
						onChange={() => this.toggleCheck(task.id)}
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
		});
	};

	handleInputChange = e => {
		this.setState({
			inputText: e.target.value
		});
	};

	handleOnBlur = (e, id) => {
		const updatedTasks = this.props.list.tasks.map(task => {
			if (task.id == id) {
				return {
					id: task.id,
					name: e.target.textContent,
					completed: task.completed
				};
			}
			return task;
		});
		this.props.updateList(updatedTasks);
	};

	addTask = e => {
		e.preventDefault();
		const task = {
			id: new Date().getTime().toString(),
			name: this.state.inputText,
			completed: false
		};
		let updatedTasks = [...this.props.list.tasks, task];
		this.props.updateList(updatedTasks);
		this.setState({ inputText: "" });
	};

	toggleCheck = id => {
		const updatedTasks = this.props.list.tasks.map(task => {
			if (task.id == id) {
				return { id: task.id, name: task.name, completed: !task.completed };
			}
			return task;
		});
		this.props.updateList(updatedTasks);
	};

	deleteTodo = id => {
		const updatedTasks = this.props.list.tasks.filter(task => task.id !== id);
		this.props.updateList(updatedTasks);
	};

	render() {
		if (!this.props.list.tasks) {
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

export default TasksContainer;
