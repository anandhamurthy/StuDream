import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./Brains.css";

function BrainCard(props) {
	const deletePin = (pin_id) => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(uid)
			.collection("My Brains")
			.doc(pin_id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	return (
		<li class="rb-item" id="rb-size">
			<div class="timestamp">
				<div class="d-flex justify-content-start align-items-center">
					<i class="fas fa-thumbtack"></i>
					<p className="m-2">{props.item.date}</p>
				</div>
			</div>
			<div class="item-title card border-0 shadow-sm p-2">
				<div class="d-flex justify-content-between align-items-center">
					<p className="m-1 ">
						<i>{props.item.title}</i>
					</p>

					{props.friend_view ? (
						<i
							class="delete far fa-trash-alt"
							onClick={() => {
								deletePin(props.item.pin_id);
							}}
						></i>
					) : (
						""
					)}
				</div>

				<p className="m-0">{props.item.message}</p>
			</div>
		</li>
	);
}

export default BrainCard;
