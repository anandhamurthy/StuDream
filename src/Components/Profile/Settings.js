import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./Profile.css";

function Settings(props) {
	const [cupboard, setCupboard] = useState(false);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(props.user_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setCupboard(doc.data().isCupboard);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	}, []);

	const lockCupboard = () => {
		setCupboard(!cupboard);
		const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(uid)
			.update({
				isCupboard: cupboard,
			})
			.then(() => {
				console.log("Document successfully updated!");
			})
			.catch((error) => {
				console.error("Error updating document: ", error);
			});
	};

	function logout() {
		localStorage.setItem("isUser", false);
		window.location = "/";
	}

	return (
		<div className="border-0 p-2">
			<div class="card-body">
				<div class="row">
					<div class="col-sm-3">
						<h6 class="mb-0">Lock my Cupboard</h6>
					</div>
					<div class="col-sm-6 text-secondary">
						If on will not be visible to your friends
					</div>

					<div class="col-sm-3 text-secondary">
						{cupboard ? (
							<button
								class="btn btn-primary btn-sm"
								onClick={lockCupboard}
							>
								ON
							</button>
						) : (
							<button
								class="btn btn-primary btn-sm"
								onClick={lockCupboard}
							>
								OFF
							</button>
						)}
					</div>
				</div>
				<hr></hr>
				<div class="row">
					<div class="col-sm-3">
						<h6 class="mb-0">Logout</h6>
					</div>
					<div class="col-sm-6 text-secondary">
						Lock your room and go out!
					</div>
					<div class="col-sm-3 text-secondary">
						<button class="btn btn-primary btn-sm" onClick={logout}>
							Logout
						</button>
					</div>
				</div>
				<hr></hr>
			</div>
		</div>
	);
}

export default Settings;
