import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import high from "../Img/tag_high.png";
import medium from "../Img/tag_medium.png";
import low from "../Img/tag_low.png";

import "./Todo.css";

function TodoCard(props) {
	const deleteTodo = (todo_id) => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Todos")
			.doc(todo_id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	const changeTodo = (todo_id) => {
		const check_box = document.querySelector(".check_box");
		check_box.checked = true;
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Todos")
			.doc(todo_id)
			.update({
				status: "Doing",
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				console.error("Error updating document: ", error);
			});
	};
	const changeDoing = (todo_id) => {
		const uid = getUser().uid;
		const check_box = document.querySelector(".check_box");
		check_box.checked = true;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Todos")
			.doc(todo_id)
			.update({
				status: "Completed",
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
	};
	return (
		<div>
			<div className="shadow-sm todo-card">
				<div class="mx-3 d-flex justify-content-between align-items-center">
					<div class="d-flex justify-content-start align-items-center">
						{props.item.status === "Completed" ||
						props.friend_view === false ? (
							""
						) : (
							<input
								type="checkbox"
								className="mx-2 check_box"
								checked={false}
								onChange={() => {
									props.item.status === "Todo"
										? changeTodo(props.item.todo_id)
										: changeDoing(props.item.todo_id);
								}}
							/>
						)}
						<h5 className="m-0">{props.item.title}</h5>
					</div>
					<div className="d-flex justify-content-start align-items-center">
						{props.friend_view ? (
							<i
								class="delete far fa-trash-alt"
								onClick={() => {
									deleteTodo(props.item.todo_id);
								}}
							></i>
						) : (
							""
						)}
					</div>
				</div>
				<p className="mx-3 my-0">
					<i>{props.item.todo}</i>
				</p>
				<div className="mx-3 d-flex justify-content-end align-items-center">
					{(() => {
						if (props.item.priority === "High") {
							return (
								<img
									src={high}
									className="align-self-center"
									width="20px"
									alt=""
								/>
							);
						} else if (props.item.priority === "Medium") {
							return (
								<img
									src={medium}
									className="align-self-center"
									width="20px"
									alt=""
								/>
							);
						} else {
							return (
								<img
									src={low}
									className="align-self-center"
									width="20px"
									alt=""
								/>
							);
						}
					})()}

					<p className="m-1 align-self-center">
						{props.item.priority}
					</p>
				</div>
			</div>
		</div>
	);
}

export default TodoCard;
