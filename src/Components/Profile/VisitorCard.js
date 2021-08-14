import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

function VisitorCard(props) {
	const [name, setName] = useState("");
	const [date, setDate] = useState("");

	useEffect(() => {
		const uid = getUser().uid;

		return db
			.collection("Users")
			.doc(props.item.visitor_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setName(doc.data().name);
					let d = doc.data().visitor_date;
					var datestring =
						("0" + d.getDate()).slice(-2) +
						"-" +
						("0" + (d.getMonth() + 1)).slice(-2) +
						"-" +
						d.getFullYear() +
						" " +
						("0" + d.getHours()).slice(-2) +
						":" +
						("0" + d.getMinutes()).slice(-2);
					setDate(datestring);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	}, []);
	return (
		<div>
			<div className="visitor-card m-2">
				<div className="shadow border-0 p-4">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex justify-content-start align-items-center">
							<div>
								<p className="mx-2 my-0">
									<b>{name}</b>
								</p>
								<p className="mx-2 my-0">
									<b>{date}</b>
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
