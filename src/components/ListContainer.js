import React, { Component } from "react";
import TasksContainer from "./TasksContainer";

import "../App.css";
class ListContainer extends Component {
	state = {
		lists: [
			{
				id: 1,
				name: "Office",
				tasks: [
					{ id: 1, name: "Complete TODO", completed: false },
					{ id: 2, name: "Learn Redux store design", completed: false }
				]
			},
			{
				id: 2,
				name: "Home",
				tasks: [
					{ id: 1, name: "Clean bathroom", completed: false },
					{ id: 2, name: "Buy veggies and fruits", completed: false },
					{ id: 3, name: "Do the laundry", completed: true }
				]
			}
		],
		selectedList: {},
		inputText: ""
	};

	handleSelectList = id => {
		const selectedList = this.state.lists.find(list => list.id == id);
		this.setState({
			selectedList
		});
	};

	inputOnChange = e => {
		this.setState({ inputText: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		let newListObj = {
			id: new Date().getTime().toString(),
			name: this.state.inputText,
			tasks: []
		};
		let newList = [...this.state.lists, newListObj];
		console.log("new List: ", newList);
		this.setState({
			lists: newList,
			inputText: "",
			selectedList: newListObj
		});
	};

	updateList = updatedTaskArray => {
		let updatedSelectedList = {
			id: this.state.selectedList.id,
			name: this.state.selectedList.name,
			tasks: [...updatedTaskArray]
		};

		let newList = this.state.lists.map(list => {
			if (list.id !== this.state.selectedList.id) {
				return list;
			} else {
				return updatedSelectedList;
			}
		});
		this.setState({ lists: newList, selectedList: updatedSelectedList });
	};

	// addTask = updatedTaskArray => {
	// 	this.updateList(updatedTaskArray);
	// };

	// toggleCheck = updatedTaskArray => {
	// 	this.updateList(updatedTaskArray);
	// };

	// deleteTodo = updatedTaskArray => {
	// 	this.updateList(updatedTaskArray);
	// };

	renderList = () => {
		if (this.state.lists.length === 0) {
			return <div>Please add new list</div>;
		}
		return this.state.lists.map(list => {
			return (
				<li key={list.id} onClick={() => this.handleSelectList(list.id)}>
					{list.name}
				</li>
			);
		});
	};

	render() {
		return (
			<div className="d-flex">
				<div className="m-3 list-container">
					<h4>Lists</h4>
					<ul>{this.renderList()}</ul>
					<form className="add-list-container" onSubmit={this.onSubmit}>
						<input
							type="text"
							value={this.state.inputText}
							onChange={this.inputOnChange}
						/>
						<button>Submit</button>
					</form>
				</div>

				<TasksContainer
					list={this.state.selectedList}
					updateList={this.updateList}
				/>
			</div>
		);
	}
}

export default ListContainer;
