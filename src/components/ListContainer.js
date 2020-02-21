import React, { Component } from "react";
import { connect } from "react-redux";

import TasksContainer from "./TasksContainer";
import "../App.css";

import { addList, selectList } from "../actions/index";

class ListContainer extends Component {
	state = {
		selectedList: {},
		// lists: [
		// 	{
		// 		id: 1,
		// 		name: "Office",
		// 		tasks: [
		// 			{ id: 1, name: "Complete TODO", completed: false },
		// 			{ id: 2, name: "Learn Redux store design", completed: false }
		// 		]
		// 	},
		// 	{
		// 		id: 2,
		// 		name: "Home",
		// 		tasks: [
		// 			{ id: 1, name: "Clean bathroom", completed: false },
		// 			{ id: 2, name: "Buy veggies and fruits", completed: false },
		// 			{ id: 3, name: "Do the laundry", completed: true }
		// 		]
		// 	}
		// ],
		inputText: ""
	};

	componentDidMount() {
		this.setState({
			lists2: this.props.lists,
			selectedList: this.props.selectedList
		});
	}

	handleSelectList = id => {
		const selectedList = this.props.lists.find(list => list.id == id);
		this.setState({
			selectedList: id
		});

		this.props.selectList(id);
	};

	inputOnChange = e => {
		this.setState({ inputText: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const id = new Date().getTime().toString();
		let newListObj = {
			id: id,
			name: this.state.inputText,
			tasks: []
		};

		// let newList = [...this.state.lists, newListObj];
		// console.log("new List: ", newList);
		this.setState({
			// lists: newList,
			inputText: ""
			// selectedList: newListObj
		});

		this.props.addList(newListObj);
		this.props.selectList(id);
	};

	updateList = updatedTaskArray => {
		let updatedSelectedList = {
			id: this.props.selectedList.id,
			name: this.props.selectedList.name,
			tasks: [...updatedTaskArray]
		};

		let newList = this.props.lists.map(list => {
			if (list.id !== this.props.selectedList.id) {
				return list;
			} else {
				return updatedSelectedList;
			}
		});
		this.setState({ lists: newList, selectedList: updatedSelectedList });
	};

	renderList = () => {
		if (this.props.lists.length === 0) {
			return <div>Please add new list</div>;
		}
		return this.props.lists.map(list => {
			return (
				<li
					key={list.id}
					className={list.id == this.props.selectedListId ? "active-list" : ""}
					onClick={() => this.handleSelectList(list.id)}
				>
					{list.name}
				</li>
			);
		});
	};

	render() {
		const list = this.props.lists.find(
			list => list.id == this.props.selectedListId
		);

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
					list={list}
					// updateList={this.updateList}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log("Reducer state", state);

	return {
		selectedListId: state.listReducer.selectedListId,
		lists: state.listReducer.lists
	};
}

export default connect(mapStateToProps, {
	addList,
	selectList
})(ListContainer);
