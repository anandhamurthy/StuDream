import React, { useState } from "react";
import "./EducationSide.css";

import room_3 from "../Img/room_3.png";
import medals from "../Img/achievement.gif";
import computer from "../Img/computer.png";
import exam from "../Img/edu.gif";
import Education from "../Education/Education";
import Achievement from "../Achievement/Achievement";

import close from "../Img/close.png";
import Profile from "../Profile/Profile";

function EducationSide(props) {
	const [education, setEducation] = useState(false);
	const [achievement, setAchievement] = useState(false);
	const [profile, setProfile] = useState(false);

	const openEducation = () => {
		setEducation(!education);
	};

	const openAchievement = () => {
		setAchievement(!achievement);
	};

	const openProfile = () => {
		setProfile(!profile);
	};
	return (
		<body>
			<section>
				<img src={room_3} alt="" id="room_3" />
				<img
					src={computer}
					alt=""
					id="my_computer"
					onClick={openProfile}
				/>

				<img
					src={medals}
					alt=""
					id="my_achievement"
					onClick={openAchievement}
				/>

				<img src={exam} alt="" id="my_exam" onClick={openEducation} />
			</section>

			{education ? (
				<div id="modal">
					<img
						src={close}
						alt=""
						id="close"
						onClick={openEducation}
					/>
					<Education
						user_id={props.user_id}
						friend_view={props.friend_view}
					></Education>
				</div>
			) : (
				""
			)}

			{profile ? (
				<div id="modal">
					<img src={close} alt="" id="close" onClick={openProfile} />
					<Profile
						user_id={props.user_id}
						friend_view={props.friend_view}
					></Profile>
				</div>
			) : (
				""
			)}

			{achievement ? (
				<div id="modal">
					<img
						src={close}
						alt=""
						id="close"
						onClick={openAchievement}
					/>
					<Achievement
						user_id={props.user_id}
						friend_view={props.friend_view}
					></Achievement>
				</div>
			) : (
				""
			)}
		</body>
	);
}

export default EducationSide;
