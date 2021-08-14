import React, { useState, useEffect } from "react";
import CalenderSide from "../CalenderSide/CalenderSide";
import InspirationSide from "../InspirationSide/InspirationSide";
import EducationSide from "../EducationSide/EducationSide";
import BrainSide from "../BrainSide/BrainSide";

import left from "../Img/left.png";
import right from "../Img/right.png";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./MyRoom.css";
import PageNotFound from "../PageNotFound/PageNotFound";

function MyRoom() {
	const params = useParams();
	const [verify, setVerify] = useState(false);
	const [my_view, setView] = useState(1);

	const leftSwift = () => {
		if (my_view === 1) {
			setView(4);
		} else setView(my_view - 1);
		console.log(my_view);
	};

	const rightSwift = () => {
		setView(my_view + 1);
		console.log(my_view);
		if (my_view === 4) {
			setView(1);
		}
	};

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

	return (
		<div>
			{verify ? (
				<section id="my_room">
					<img src={left} alt="" id="left" onClick={leftSwift} />
					<img src={right} alt="" id="right" onClick={rightSwift} />

					<div>
						{(() => {
							switch (my_view) {
								case 1:
									return (
										<InspirationSide
											user_id={params.id}
											friend_view={
												params.id === getUser().uid
											}
										></InspirationSide>
									);
								case 2:
									return (
										<CalenderSide
											user_id={params.id}
											friend_view={
												params.id === getUser().uid
											}
										></CalenderSide>
									);
								case 3:
									return (
										<EducationSide
											user_id={params.id}
											friend_view={
												params.id === getUser().uid
											}
										></EducationSide>
									);
								case 4:
									return (
										<BrainSide
											user_id={params.id}
											friend_view={
												params.id === getUser().uid
											}
										></BrainSide>
									);
								default:
									return (
										<InspirationSide
											user_id={params.id}
											friend_view={
												params.id === getUser().uid
											}
										></InspirationSide>
									);
							}
						})()}
					</div>
				</section>
			) : (
				<div>
					<PageNotFound></PageNotFound>
				</div>
			)}
		</div>
	);
}

export default MyRoom;
