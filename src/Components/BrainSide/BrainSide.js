import React, { useState, useEffect } from "react";
import "./BrainSide.css";

import room_4 from "../Img/room_4.png";
import main_brain from "../Img/brain.png";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import brain_1 from "../Img/pin.png";
import brain_2 from "../Img/pin.png";
import brain_3 from "../Img/pin.png";
import brain_4 from "../Img/pin.png";
import brain_5 from "../Img/pin.png";
import brain_6 from "../Img/pin.png";
import brain_7 from "../Img/pin.png";
import Brains from "../Brains/Brains";

import close from "../Img/close.png";
import SingleBrainView from "../Brains/SingleBrainView";

function BrainSide(props) {
	const [brain, setBrain] = useState(false);
	const [singleBrain, setSingleBrain] = useState(false);

	const [brainID, setBrainID] = useState("");

	function openBrains() {
		setBrain(!brain);
	}

	function openSingleBrain(brain_id) {
		setBrainID(brain_id);
		setSingleBrain(!singleBrain);

		console.log(brainID);
	}

	const [b_1, setBrain1] = useState([]);
	const [b_2, setBrain2] = useState([]);
	const [b_3, setBrain3] = useState([]);
	const [b_4, setBrain4] = useState([]);
	const [b_5, setBrain5] = useState([]);
	const [b_6, setBrain6] = useState([]);
	const [b_7, setBrain7] = useState([]);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
			.doc(props.user_id)
			.collection("My Brains")
			.onSnapshot((snapshot) => {
				const brain1 = [];
				const brain2 = [];
				const brain3 = [];
				const brain4 = [];
				const brain5 = [];
				const brain6 = [];
				const brain7 = [];
				snapshot.forEach((doc) => {
					if (doc.data().brain === "Brain 1")
						brain1.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 2")
						brain2.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 3")
						brain3.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 4")
						brain4.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 5")
						brain5.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 6")
						brain6.push({ ...doc.data(), id: doc.id });
					else if (doc.data().brain === "Brain 7")
						brain7.push({ ...doc.data(), id: doc.id });
				});
				setBrain1(brain1);
				setBrain2(brain2);
				setBrain3(brain3);
				setBrain4(brain4);
				setBrain5(brain5);
				setBrain6(brain6);
				setBrain7(brain7);

				console.log(brain_1);
				console.log(brain_2);
				console.log(brain_3);
				console.log(brain_4);
			});
	}, []);

	return (
		<body>
			<section id="brain_room">
				<img src={room_4} alt="" id="room_4" />

				{props.friend_view ? (
					<img
						src={main_brain}
						alt=""
						onClick={openBrains}
						id="brain"
					/>
				) : (
					<img src={main_brain} alt="" id="brain" />
				)}

				{b_1.length != 0 ? (
					<img
						src={brain_1}
						alt=""
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 1"
						id="brain_1"
						onClick={() => {
							openSingleBrain("brain_1");
						}}
					/>
				) : (
					""
				)}

				{b_2.length != 0 ? (
					<img
						src={brain_2}
						alt=""
						id="brain_2"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 2"
						onClick={() => {
							openSingleBrain("brain_2");
						}}
					/>
				) : (
					""
				)}

				{b_3.length != 0 ? (
					<img
						src={brain_3}
						alt=""
						id="brain_3"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 3"
						onClick={() => {
							openSingleBrain("brain_3");
						}}
					/>
				) : (
					""
				)}

				{b_4.length != 0 ? (
					<img
						src={brain_4}
						alt=""
						id="brain_4"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 4"
						onClick={() => {
							openSingleBrain("brain_4");
						}}
					/>
				) : (
					""
				)}

				{b_5.length != 0 ? (
					<img
						src={brain_5}
						alt=""
						id="brain_5"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 5"
						onClick={() => {
							openSingleBrain("brain_5");
						}}
					/>
				) : (
					""
				)}

				{b_6.length != 0 ? (
					<img
						src={brain_6}
						alt=""
						id="brain_6"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 6"
						onClick={() => {
							openSingleBrain("brain_6");
						}}
					/>
				) : (
					""
				)}

				{b_7.length != 0 ? (
					<img
						src={brain_7}
						alt=""
						id="brain_7"
						data-toggle="tooltip"
						data-placement="top"
						title="Brain 7"
						onClick={() => {
							openSingleBrain("brain_7");
						}}
					/>
				) : (
					""
				)}
			</section>

			{brain ? (
				<div id="modal">
					<img src={close} alt="" id="close" onClick={openBrains} />
					<Brains id="brains"></Brains>
				</div>
			) : (
				<div></div>
			)}

			{singleBrain ? (
				<div id="modal">
					<img
						src={close}
						alt=""
						id="close"
						onClick={() => {
							openSingleBrain("close");
						}}
					/>

					{(() => {
						if (brainID === "brain_1") {
							return (
								<SingleBrainView
									items={b_1}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_2") {
							return (
								<SingleBrainView
									items={b_2}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_3") {
							return (
								<SingleBrainView
									items={b_3}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_4") {
							return (
								<SingleBrainView
									items={b_4}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_5") {
							return (
								<SingleBrainView
									items={b_5}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_6") {
							return (
								<SingleBrainView
									items={b_6}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						} else if (brainID === "brain_7") {
							return (
								<SingleBrainView
									items={b_7}
									id="single-brains"
									friend_view={props.friend_view}
								></SingleBrainView>
							);
						}
					})()}
				</div>
			) : (
				<div></div>
			)}
		</body>
	);
}

export default BrainSide;
