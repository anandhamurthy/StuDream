import React, { useState } from "react";
import "./EducationSide.css";

import room_3 from "../Img/room_3.png";
import medals from "../Img/awards.png";
import computer from "../Img/comp.png";
import exam from "../Img/exam.png";
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
			<section id="education_room">
				<img src={room_3} alt="" id="room_3" />
				<img
					src={computer}
					alt=""
					id="computer"
					onClick={openProfile}
				/>
				<img
					src={medals}
					alt=""
					id="medals"
					onClick={openAchievement}
				/>
				<img src={exam} alt="" id="exam" onClick={openEducation} />
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
						id="education"
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
						id="profile"
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
						id="achievement"
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
