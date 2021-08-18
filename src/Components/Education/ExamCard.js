import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import "./Education.css";

function ExamCard(props) {
	const deleteExam = (exam_id) => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(uid)
			.collection("My Exams")
			.doc(exam_id)
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
			<div className="exam-card m-2">
				<div className="shadow border-0 p-4">
					<h5 className="text-white text-center">
						{props.item.exam_name}
					</h5>
					<p className="text-white text-center">
						{props.item.exam_date}
					</p>
					<div className="d-flex justify-content-start align-items-center">
						{props.friend_view ? (
							<i
								className="delete far fa-trash-alt text-white"
								onClick={() => {
									deleteExam(props.item.exam_id);
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

export default ExamCard;
