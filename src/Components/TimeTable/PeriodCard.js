import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./TimeTable.css";

function PeriodCard(props) {
	const deletePeriod = (timetable_id) => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My TimeTable")
			.doc(timetable_id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	return (
		<div>
			<div className="shadow-sm period-card ">
				<div className="mx-3 d-flex justify-content-between align-items-center">
					<div className="d-flex justify-content-start align-items-center">
						<div>
							<p className="mx-2 my-0">
								<b>{props.item.name}</b>
							</p>
							<p className="mx-2 my-0">
								<i>{props.item.teacher}</i>
							</p>
							<p className="mx-2 my-0">
								<i>
									{props.item.start_time} -{" "}
									{props.item.end_time}
								</i>
							</p>
						</div>
					</div>
					<div className="d-flex justify-content-start align-items-center">
						{props.friend_view ? (
							<i
								class="delete far fa-trash-alt"
								onClick={() => {
									deletePeriod(props.item.timetable_id);
								}}
							></i>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PeriodCard;
