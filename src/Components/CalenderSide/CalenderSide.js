import React, { useState, useEffect } from "react";
import "./CalenderSide.css";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import room_2 from "../Img/room_2.png";
import cupboard from "../Img/cupboard.png";
import todo_img from "../Img/todo.gif";
import time_table_img from "../Img/timetable.gif";
import budha from "../Img/budha.png";
import Todo from "../Todo/Todo";
import close from "../Img/close.png";
import Cupboard from "../Cupboard/Cupboard";
import TimeTable from "../TimeTable/TimeTable";

function CalenderSide(props) {
	const [todo, setTodo] = useState(false);
	const [my_cupboard, setMyCupboard] = useState(false);
	const [timetable, setTimetable] = useState(false);

	const [lockCupboard, setLockCupboard] = useState(false);

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(props.user_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setLockCupboard(doc.data().isCupboard);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});

	const openTodo = () => {
		setTodo(!todo);
	};

	const openTimeTable = () => {
		setTimetable(!timetable);
	};

	const openCupboard = () => {
		setMyCupboard(!my_cupboard);
	};

	return (
		<body>
			<section>
				<img src={room_2} alt="" id="room_2" onClick={openTimeTable} />

				{lockCupboard ? (
					<img src={cupboard} alt="" id="my_cupboard" />
				) : (
					<img
						src={cupboard}
						alt=""
						id="my_cupboard"
						onClick={openCupboard}
					/>
				)}
				<img src={todo_img} alt="" id="my_todo" onClick={openTodo} />
				<img
					src={time_table_img}
					alt=""
					id="my_time_table"
					onClick={openTimeTable}
				/>
				<img src={budha} alt="" id="my_budha" />
			</section>

			{todo ? (
				<div id="modal">
					<img src={close} alt="" id="close" onClick={openTodo} />
					<Todo
						user_id={props.user_id}
						friend_view={props.friend_view}
					></Todo>
				</div>
			) : (
				""
			)}

			{my_cupboard ? (
				<div id="modal">
					<img src={close} alt="" id="close" onClick={openCupboard} />
					<Cupboard
						user_id={props.user_id}
						friend_view={props.friend_view}
					></Cupboard>
				</div>
			) : (
				""
			)}

			{timetable ? (
				<div id="modal">
					<img
						src={close}
						alt=""
						id="close"
						onClick={openTimeTable}
					/>
					<TimeTable
						user_id={props.user_id}
						friend_view={props.friend_view}
					></TimeTable>
				</div>
			) : (
				""
			)}
		</body>
	);
}

export default CalenderSide;
