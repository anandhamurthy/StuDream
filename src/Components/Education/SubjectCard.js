import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import "./Education.css";

function SubjectCard(props) {
	const deleteSubject = (sub_id) => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(uid)
			.collection("My Subjects")
			.doc(sub_id)
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
			<div className="subject-card  m-2">
				<div className="shadow-sm border-0 p-4">
					<h5 className="text-white text-center">
						{props.item.subject_name}
					</h5>
					<p className="text-white text-center">
						{props.item.subject_marks} /{" "}
						{props.item.subject_total_marks}
					</p>
					<div className="d-flex justify-content-start align-items-center">
						{props.friend_view ? (
							<i
								className="delete far fa-trash-alt text-white"
								onClick={() => {
									deleteSubject(props.item.subject_id);
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

export default SubjectCard;
