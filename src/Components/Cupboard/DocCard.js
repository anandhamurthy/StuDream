import React from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

function DocCard(props) {
	const deleteDoc = (doc_id) => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(uid)
			.collection("My Docs")
			.doc(doc_id)
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
			<div className="doc-card m-2">
				<div className="shadow border-0 p-4">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<a
								href={props.item.doc}
								target="_blank"
								rel="noreferrer"
							>
								<i className="mx-2 far fa-file-pdf doc-icon"></i>
							</a>
							<div>
								<p className="mx-3 my-0">
									<b>{props.item.name}</b>
								</p>
								<p className="mx-3 my-0">
									<i>{props.item.description}</i>
								</p>
							</div>
						</div>
						{props.friend_view ? (
							<i
								className="delete far fa-trash-alt"
								onClick={() => {
									deleteDoc(props.item.doc_id);
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

export default DocCard;
