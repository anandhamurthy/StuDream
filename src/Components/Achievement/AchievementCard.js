import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./Achievement.css";

function AchievementCard(props) {
	const deleteTodo = (ach_id) => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Achievements")
			.doc(ach_id)
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
			<div className="achievement-card  shadow-sm">
				<div class="mx-3 d-flex justify-content-between align-items-center">
					<h5 className="m-0">{props.item.event_name}</h5>
					<div className="d-flex justify-content-start align-items-center">
						{props.friend_view ? (
							<i
								class="delete far fa-trash-alt"
								onClick={() => {
									deleteTodo(props.item.achievement_id);
								}}
							></i>
						) : (
							""
						)}
					</div>
				</div>
				<p className="mx-3 my-0">
					<i>{props.item.event_place}</i>
				</p>
				<p className="mx-3 my-0">
					<i>{props.item.event_date}</i>
				</p>

				{props.item.event_images.length != 0 ? (
					<div>
						<div className="p-2 album-card d-flex justify-content-start align-items-center">
							<i class=" mx-2 far fa-images"></i>

							<div>
								<p className="mx-1 my-0">Event Photos</p>
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default AchievementCard;
