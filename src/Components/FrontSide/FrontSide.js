import React, { useState, useEffect } from "react";
import "./FrontSide.css";

import door from "../Img/front.png";
import bio_metrics from "../Img/bio_metric.png";
import scan from "../Img/finger_print.gif";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import PageNotFound from "../PageNotFound/PageNotFound";

function FrontSide() {
	const params = useParams();
	const [verify, setVerify] = useState(false);

	function openRoom() {
		window.location =
			"/my-room/" + JSON.parse(localStorage.getItem("user")).uid;
	}

	function openFriendRoom() {
		localStorage.setItem("friend_user_id", params.id);
		window.location = "/my-room/" + params.id;
	}

	useEffect(() => {
		db.collection("User ID")
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
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Visitors")
			.doc().id;
		return db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Visitors")
			.doc(key)
			.set({
				visitor_date: new Date(),
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
				<section id="education_room">
					<img src={door} alt="" id="door" />
					<img src={bio_metrics} alt="" id="bio_metrics" />
					{params.id ===
					JSON.parse(localStorage.getItem("user")).uid ? (
						<img
							src={scan}
							alt=""
							id="scanner"
							onClick={openRoom}
						/>
					) : (
						<img
							src={scan}
							alt=""
							id="scanner"
							onClick={onSubmit}
						/>
					)}
					<p id="name">{localStorage.getItem("userName")}'s Room</p>
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
