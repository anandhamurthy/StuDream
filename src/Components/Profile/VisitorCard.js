import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import finger_print from "../Img/finger_print.png";

function VisitorCard(props) {
	const [name, setName] = useState("");
	//const [date, setDate] = useState("");

	useEffect(() => {
		//const uid = getUser().uid;

		return db
			.collection("Users")
			.doc(props.item.visitor_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setName(doc.data().name);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});
	return (
		<div>
			<div id="card-2" className="visitor-card m-2">
				<div className="shadow-sm border-0 p-4">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<img
								src={finger_print}
								alt=""
								className="visitor_finger_print"
							></img>
							<div>
								<p className="mx-2 my-0">
									<b>{name}</b>
								</p>
								<p className="mx-2 my-0">
									<b>{props.item.visitor_date}</b>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VisitorCard;
