import React, { useState, useEffect } from "react";
import "./CalenderSide.css";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import room_2 from "../Img/room_2.png";
import cupboard from "../Img/cupboard.png";
import calendar from "../Img/calendar.png";
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
		const uid = getUser().uid;
		db.collection("Users")
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
	}, []);

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
			<section id="calender_room">
				<img src={room_2} alt="" id="room_2" onClick={openTimeTable} />
				<img
					src={cupboard}
					alt=""
					id="cupboard"
					onClick={openCupboard}
				/>

				{lockCupboard ? (
					<img src={cupboard} alt="" id="cupboard" />
				) : (
					<img
						src={cupboard}
						alt=""
						id="cupboard"
						onClick={openCupboard}
					/>
				)}
				<img src={calendar} alt="" id="calendar" onClick={openTodo} />
				<img src={budha} alt="" id="budha" />
			</section>

			{todo ? (
				<div id="modal">
					<img src={close} alt="" id="close" onClick={openTodo} />
					<Todo
						id="todo"
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
						id="my_cupboard"
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
					<TimeTable id="my_cupboard"></TimeTable>
				</div>
			) : (
				""
			)}
		</body>
	);
}

export default CalenderSide;
