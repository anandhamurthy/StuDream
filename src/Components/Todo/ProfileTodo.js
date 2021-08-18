import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import "./Todo.css";
import TodoCard from "./TodoCard";
import Empty from "../Empty/Empty";

function ProfileTodo(props) {
	const [search1, setSearch1] = useState("");
	const [search2, setSearch2] = useState("");
	const [search3, setSearch3] = useState("");

	const [todo_todo, setTodoTodo] = useState([]);
	const [doing_todo, setDoingTodo] = useState([]);
	const [completed_todo, setCompletedTodo] = useState([]);

	const [searchTodo, setSearchTodo] = useState([]);
	const [searchDoing, setSearchDoing] = useState([]);
	const [searchCompleted, setSearchCompleted] = useState([]);

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My Todos")
			.onSnapshot((snapshot) => {
				const completedTodo = [];
				const doingTodo = [];
				const todoTodo = [];
				snapshot.forEach((doc) => {
					if (doc.data().status === "Completed")
						completedTodo.push({ ...doc.data(), id: doc.id });
					else if (doc.data().status === "Doing")
						doingTodo.push({ ...doc.data(), id: doc.id });
					else if (doc.data().status === "Todo")
						todoTodo.push({ ...doc.data(), id: doc.id });
				});
				setTodoTodo(todoTodo);
				setDoingTodo(doingTodo);
				setCompletedTodo(completedTodo);
			});
	});

	const onTodoSearch = async (event) => {
		event.preventDefault();

		setSearchTodo(todo_todo);

		if (search1 === "") {
			alert("Enter Something.");
			setSearchTodo(todo_todo);
			return;
		}
		const result = todo_todo.filter((item) =>
			item.title.toLowerCase().includes(search1.toLowerCase())
		);
		setSearchTodo(result);
	};

	const onDoingSearch = async (event) => {
		event.preventDefault();

		setSearchDoing(doing_todo);

		if (search2 === "") {
			alert("Enter Something.");
			setSearchDoing(doing_todo);
			return;
		}
		const result = doing_todo.filter((item) =>
			item.title.toLowerCase().includes(search2.toLowerCase())
		);
		setSearchDoing(result);
	};

	const onCompletedSearch = async (event) => {
		event.preventDefault();

		setSearchCompleted(completed_todo);

		if (search3 === "") {
			setSearchCompleted(completed_todo);
			alert("Enter Something.");
			return;
		}
		const result = completed_todo.filter((item) =>
			item.title.toLowerCase().includes(search3.toLowerCase())
		);
		setSearchCompleted(result);
	};

	return (
		<div className="p-2 border-0 card">
			<div>
				<ul className="nav nav-tabs my-2" id="nav-tab" role="tablist">
					<li className="nav-item" role="presentation">
						<button
							className="nav-link active"
							id="todo-tab"
							data-bs-toggle="tab"
							data-bs-target="#todo_"
							type="button"
							role="tab"
							aria-controls="todo"
							aria-selected="true"
						>
							Todo
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button
							className="nav-link"
							id="doing-tab"
							data-bs-toggle="tab"
							data-bs-target="#doing"
							type="button"
							role="tab"
							aria-controls="doing"
							aria-selected="false"
						>
							Doing
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button
							className="nav-link"
							id="completed-tab"
							data-bs-toggle="tab"
							data-bs-target="#completed"
							type="button"
							role="tab"
							aria-controls="completed"
							aria-selected="false"
						>
							Completed
						</button>
					</li>
				</ul>
			</div>
			<div>
				<div className="tab-content" id="myTabContent">
					<div
						className="tab-pane fade show active"
						id="todo_"
						role="tabpanel"
						aria-labelledby="todo-tab"
					>
						{todo_todo.length !== 0 ? (
							<div className="input-group mb-3">
								<input
									type="text"
									className="shadow-sm rounded-right border-0 form-control"
									placeholder="search.."
									onChange={(event) =>
										setSearch1(event.target.value)
									}
								/>
								<span
									className="shadow-sm rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i
										className="fas fa-search"
										onClick={onTodoSearch}
									></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="lefttab">
							<div className=" list-group">
								{todo_todo.length !== 0 ? (
									<div>
										{search1.length !== 0
											? searchTodo.map((item, index) => (
													<TodoCard
														item={item}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></TodoCard>
											  ))
											: todo_todo.map((item, index) => (
													<TodoCard
														item={item}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></TodoCard>
											  ))}
									</div>
								) : (
									<div className="m-auto p-5 d-flex align-items-center justify-content-center">
										<Empty></Empty>
									</div>
								)}
							</div>
						</div>
					</div>
					<div
						className="tab-pane fade"
						id="doing"
						role="tabpanel"
						aria-labelledby="doing-tab"
					>
						<div className="input-group mb-3">
							{doing_todo.length !== 0 ? (
								<div className="input-group mb-3">
									<input
										type="text"
										className="shadow-sm rounded-right border-0 form-control"
										placeholder="search.."
										onChange={(event) =>
											setSearch2(event.target.value)
										}
									/>
									<span
										className="shadow-sm rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i
											className="fas fa-search"
											onClick={onDoingSearch}
										></i>
									</span>
								</div>
							) : (
								""
							)}
						</div>
						<div className="lefttab">
							<div className=" list-group">
								{doing_todo.length !== 0 ? (
									<div>
										{search2.length !== 0
											? searchDoing.map((item, index) => (
													<TodoCard
														item={item}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></TodoCard>
											  ))
											: doing_todo.map((item, index) => (
													<TodoCard
														item={item}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></TodoCard>
											  ))}
									</div>
								) : (
									<div className="m-auto p-5 d-flex align-items-center justify-content-center">
										<Empty></Empty>
									</div>
								)}
							</div>
						</div>
					</div>
					<div
						className="tab-pane fade"
						id="completed"
						role="tabpanel"
						aria-labelledby="completed-tab"
					>
						<div className="input-group mb-3">
							{completed_todo.length !== 0 ? (
								<div className="input-group mb-3">
									<input
										type="text"
										className="shadow-sm rounded-right border-0 form-control"
										placeholder="search.."
										onChange={(event) =>
											setSearch3(event.target.value)
										}
									/>
									<span
										className="shadow-sm rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i
											className="fas fa-search"
											onClick={onCompletedSearch}
										></i>
									</span>
								</div>
							) : (
								""
							)}
						</div>
						<div className="lefttab">
							<div className=" list-group">
								{completed_todo.length !== 0 ? (
									<div>
										{search3.length !== 0
											? searchCompleted.map(
													(item, index) => (
														<TodoCard
															item={item}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></TodoCard>
													)
											  )
											: completed_todo.map(
													(item, index) => (
														<TodoCard
															item={item}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></TodoCard>
													)
											  )}
									</div>
								) : (
									<div className="m-auto p-5 d-flex align-items-center justify-content-center">
										<Empty></Empty>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileTodo;
