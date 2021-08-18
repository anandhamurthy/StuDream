import React, { useState, useEffect } from "react";
import "./FrontSide.css";

import door from "../Img/front.png";
import bio_metrics from "../Img/finger_print.gif";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import PageNotFound from "../PageNotFound/PageNotFound";

function FrontSide() {
	const params = useParams();
	const [verify, setVerify] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(params.id)
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

	function openRoom() {
		window.location =
			"/room/" + JSON.parse(localStorage.getItem("user")).uid;
	}

	function openFriendRoom() {
		localStorage.setItem("friend_user_id", params.id);
		window.location = "/room/" + params.id;
	}

	useEffect(() => {
		db.collection("User IDs")
			.doc(params.id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setVerify(true);
				} else {
					setVerify(false);
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});

	const onSubmit = async (event) => {
		event.preventDefault();
		var user = getUser();
		const key = db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Visitors")
			.doc().id;

		var currentdate = new Date();
		var datetime =
			currentdate.getDate() +
			"/" +
			(currentdate.getMonth() + 1) +
			"/" +
			currentdate.getFullYear() +
			" @ " +
			currentdate.getHours() +
			":" +
			currentdate.getMinutes() +
			":" +
			currentdate.getSeconds();
		return db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Visitors")
			.doc(key)
			.set({
				visitor_date: datetime,
				visitor_id: params.id,
				visiting_id: key,
			})
			.then(() => {
				openFriendRoom();
				console.log("Document successfully written!");
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	};
	return (
		<div>
			{verify ? (
				<section>
					<img src={door} alt="" id="door" />
					{params.id ===
					JSON.parse(localStorage.getItem("user")).uid ? (
						<div>
							<img
								src={bio_metrics}
								alt=""
								id="bio_metrics"
								onClick={openRoom}
							/>
							<p id="name">
								{localStorage.getItem("userName")}'s Room
							</p>
						</div>
					) : (
						<div>
							<img
								src={bio_metrics}
								alt=""
								id="bio_metrics"
								onClick={onSubmit}
							/>
							<p id="name">{name}'s Room</p>
						</div>
					)}
				</section>
			) : (
				<div>
					<PageNotFound></PageNotFound>
				</div>
			)}
		</div>
	);
}

export default FrontSide;
