import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import clock from "../Img/clock.png";
import inspiration_1 from "../Img/inspiration.png";
import inspiration_2 from "../Img/inspiration.png";
import inspiration_3 from "../Img/inspiration.png";
import inspiration_4 from "../Img/inspiration.png";
import "./InspirationSide.css";
import close from "../Img/close.png";

import room_1 from "../Img/room_1.png";

import ground_lamp from "../Img/lamp.png";

//import { getUser } from "../Firebase/auth";
import ViewImg from "../ViewImg/ViewImg";

function InspirationSide(props) {
	const [inspiration, setInspiration] = useState([]);
	const [myView, setMyView] = useState(false);
	const [myQuote, setMyQuote] = useState("");
	const [img, setImg] = useState("");

	useEffect(() => {
		//const uid = getUser().uid;

		db.collection("Users")
			.doc(props.user_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setInspiration(doc.data()["inspiration_images"]);
					setMyQuote(doc.data().quote);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});

	const openMyView = (url) => {
		setImg(url);
		setMyView(!myView);
	};

	return (
		<div>
			<section>
				<img src={room_1} alt="" id="room_1" />

				{inspiration[0] ? (
					<img
						src={inspiration[0]}
						alt=""
						id="inspiration_1"
						className="my-border"
						onClick={() => {
							openMyView(inspiration[0]);
						}}
					/>
				) : (
					<img src={inspiration_1} alt="" id="inspiration_1" />
				)}
				{inspiration[1] ? (
					<img
						src={inspiration[1]}
						alt=""
						className="my-border"
						id="inspiration_2"
						onClick={() => {
							openMyView(inspiration[1]);
						}}
					/>
				) : (
					<img src={inspiration_2} alt="" id="inspiration_2" />
				)}
				{inspiration[2] ? (
					<img
						src={inspiration[2]}
						alt=""
						className="my-border"
						id="inspiration_3"
						onClick={() => {
							openMyView(inspiration[2]);
						}}
					/>
				) : (
					<img src={inspiration_3} alt="" id="inspiration_3" />
				)}
				{inspiration[3] ? (
					<img
						src={inspiration[3]}
						alt=""
						className="my-border"
						id="inspiration_4"
						onClick={() => {
							openMyView(inspiration[3]);
						}}
					/>
				) : (
					<img src={inspiration_4} alt="" id="inspiration_4" />
				)}

				<img src={clock} alt="" id="clock" />

				<img src={ground_lamp} alt="" id="ground_lamp" />

				{myView ? (
					<div id="modal">
						<img
							src={close}
							alt=""
							id="close"
							onClick={openMyView}
						/>
						<ViewImg img={img}></ViewImg>
					</div>
				) : (
					""
				)}

				<p id="quote">{myQuote}</p>
			</section>
		</div>
	);
}

export default InspirationSide;
