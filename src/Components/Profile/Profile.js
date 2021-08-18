import React, { useState, useEffect } from "react";

import inspiration_1 from "../Img/inspiration.png";
import inspiration_2 from "../Img/inspiration.png";
import inspiration_3 from "../Img/inspiration.png";
import inspiration_4 from "../Img/inspiration.png";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import "./Profile.css";
import ProfileTodo from "../Todo/ProfileTodo";
import ProfileEducation from "../Education/ProfileEducation";
import ProfileAchievement from "../Achievement/ProfileAchievement";
import ProfileBrain from "../Brains/ProfileBrain";
import ProfileCupboard from "../Cupboard/ProfileCupboard";
import ProfileTimeTable from "../TimeTable/ProfileTimeTable";
import Visitors from "./Visitors";
import Settings from "./Settings";

function Profile(props) {
	const [inspiration, setInspiration] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [user_id, setUserId] = useState("");
	const [room_url, setRoomUrl] = useState("");
	const [profileImage, setProfileImage] = useState("");

	const [cupboard, setCupboard] = useState(false);

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(props.user_id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setInspiration(doc.data()["inspiration_images"]);
					setName(doc.data().name);

					setEmail(doc.data().email_id);
					setUserId(doc.data().user_id);
					setRoomUrl(
						"https://studream.netlify.app/room/" +
							doc.data().room_id
					);
					setCupboard(doc.data().isCupboard);
					setProfileImage(doc.data().profile_image);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});

	return (
		<div className="p-5 container-fluid">
			<h3 className="text-dark">My Profile</h3>
			<div className="row align-items-center">
				<div className="p-2 col-lg-3 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-2 exam_layout">
						<div>
							<div className="d-flex justify-content-center">
								<div
									className="nav flex-column nav-pills"
									id="v-pills-tab"
									role="tablist"
									aria-orientation="vertical"
								>
									<button
										className="nav-link active"
										id="v-pills-profile-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-profile"
										type="button"
										role="tab"
										aria-controls="v-pills-profile"
										aria-selected="true"
									>
										{props.friend_view
											? "My Profile"
											: "Profile"}
									</button>
									<button
										className="nav-link"
										id="v-pills-inspiration-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-inspiration"
										type="button"
										role="tab"
										aria-controls="v-pills-inspiration"
										aria-selected="false"
									>
										{props.friend_view
											? "My Inspirations"
											: "Inspirations"}
									</button>
									<button
										className="nav-link"
										id="v-pills-todo-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-todo"
										type="button"
										role="tab"
										aria-controls="v-pills-todo"
										aria-selected="false"
									>
										{props.friend_view ? "My Todo" : "Todo"}
									</button>
									<button
										className="nav-link"
										id="v-pills-education-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-education"
										type="button"
										role="tab"
										aria-controls="v-pills-education"
										aria-selected="false"
									>
										{props.friend_view
											? "My Education"
											: "Education"}
									</button>
									<button
										className="nav-link"
										id="v-pills-achievement-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-achievement"
										type="button"
										role="tab"
										aria-controls="v-pills-achievement"
										aria-selected="false"
									>
										{props.friend_view
											? "My Achievements"
											: "Achievements"}
									</button>
									<button
										className="nav-link"
										id="v-pills-brain-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-brain"
										type="button"
										role="tab"
										aria-controls="v-pills-brain"
										aria-selected="false"
									>
										{props.friend_view
											? "My Brains"
											: "Brains"}
									</button>
									{cupboard === false ? (
										<button
											className="nav-link"
											id="v-pills-cupboard-tab"
											data-bs-toggle="pill"
											data-bs-target="#v-pills-cupboard"
											type="button"
											role="tab"
											aria-controls="v-pills-cupboard"
											aria-selected="false"
										>
											{props.friend_view
												? "My Cupboard"
												: "Cupboard"}
										</button>
									) : (
										""
									)}
									<button
										className="nav-link"
										id="v-pills-timetable-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-timetable"
										type="button"
										role="tab"
										aria-controls="v-pills-timetable"
										aria-selected="false"
									>
										{props.friend_view
											? "My Timetable"
											: "Timetable"}
									</button>
									<button
										className="nav-link"
										id="v-pills-visitor-tab"
										data-bs-toggle="pill"
										data-bs-target="#v-pills-visitor"
										type="button"
										role="tab"
										aria-controls="v-pills-visitor"
										aria-selected="false"
									>
										{props.friend_view
											? "My Visiters"
											: "Visiters"}
									</button>

									{props.friend_view ? (
										<button
											className="nav-link"
											id="v-pills-setting-tab"
											data-bs-toggle="pill"
											data-bs-target="#v-pills-setting"
											type="button"
											role="tab"
											aria-controls="v-pills-setting"
											aria-selected="false"
										>
											Room Settings
										</button>
									) : (
										""
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-2 d-md-block col-lg-9 order-lg-1">
					<div className=" shadow border-0 card p-4">
						<div className="tab-content" id="v-pills-tabContent">
							<div
								className="tab-pane fade show active"
								id="v-pills-profile"
								role="tabpanel"
								aria-labelledby="v-pills-profile-tab"
							>
								<div className="border-0 card">
									<div className=" border-0 card-body">
										<div className="d-flex flex-column align-items-center text-center">
											{profileImage ? (
												<img
													src={profileImage}
													alt="ProfileImage"
													className="rounded-circle"
													width="150"
												/>
											) : (
												<img
													src="https://bootdey.com/img/Content/avatar/avatar7.png"
													alt="ProfileImage"
													className="rounded-circle"
													width="150"
												/>
											)}
											<div className="mt-3">
												<h4>{name}</h4>
											</div>
										</div>
									</div>
								</div>

								<div className="card-body">
									<div className="row">
										<div className="col-sm-3">
											<h6 className="mb-0">Full Name</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											{name}
										</div>
									</div>
									<hr></hr>
									<div className="row">
										<div className="col-sm-3">
											<h6 className="mb-0">Email</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											{email}
										</div>
									</div>
									<hr></hr>
									<div className="row">
										<div className="col-sm-3">
											<h6 className="mb-0">User ID</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											{user_id}
										</div>
									</div>
									<hr></hr>
									<div className="row">
										<div className="col-sm-3">
											<h6 className="mb-0">Room URL</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<a
												href={room_url}
												target="_blank"
												rel="noreferrer"
											>
												{room_url}
											</a>
										</div>
									</div>
									<hr></hr>
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-inspiration"
								role="tabpanel"
								aria-labelledby="v-pills-inspiration-tab"
							>
								<div className="d-flex align-items-center justify-content-between mb-3">
									<h5 className="mb-0">My Inspirations</h5>
								</div>
								<div className="row">
									<div className=" col-lg-3 mb-2 pr-lg-1">
										{inspiration[0] ? (
											<img
												src={inspiration[0]}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										) : (
											<img
												src={inspiration_1}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										)}
									</div>
									<div className="col-lg-3 mb-2 pl-lg-1">
										{inspiration[1] ? (
											<img
												src={inspiration[1]}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										) : (
											<img
												src={inspiration_2}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										)}
									</div>
									<div className="col-lg-3 pr-lg-1 mb-2">
										{inspiration[2] ? (
											<img
												src={inspiration[2]}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										) : (
											<img
												src={inspiration_3}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										)}
									</div>
									<div className="col-lg-3 pl-lg-1">
										{inspiration[3] ? (
											<img
												src={inspiration[3]}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										) : (
											<img
												src={inspiration_4}
												alt=""
												className="img-fluid rounded shadow-sm"
											/>
										)}
									</div>
								</div>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-todo"
								role="tabpanel"
								aria-labelledby="v-pills-todo-tab"
							>
								<ProfileTodo
									user_id={props.user_id}
									friend_view={props.friend_view}
								></ProfileTodo>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-education"
								role="tabpanel"
								aria-labelledby="v-pills-education-tab"
							>
								<ProfileEducation
									user_id={props.user_id}
									friend_view={props.friend_view}
								></ProfileEducation>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-achievement"
								role="tabpanel"
								aria-labelledby="v-pills-achievement-tab"
							>
								<ProfileAchievement
									user_id={props.user_id}
									friend_view={props.friend_view}
								></ProfileAchievement>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-brain"
								role="tabpanel"
								aria-labelledby="v-pills-brain-tab"
							>
								<ProfileBrain
									user_id={props.user_id}
									friend_view={props.friend_view}
								></ProfileBrain>
							</div>
							{cupboard === false ? (
								<div
									className="tab-pane fade"
									id="v-pills-cupboard"
									role="tabpanel"
									aria-labelledby="v-pills-cupboard-tab"
								>
									<ProfileCupboard
										user_id={props.user_id}
										friend_view={props.friend_view}
									></ProfileCupboard>
								</div>
							) : (
								""
							)}
							<div
								className="tab-pane fade"
								id="v-pills-timetable"
								role="tabpanel"
								aria-labelledby="v-pills-timetable-tab"
							>
								<ProfileTimeTable
									user_id={props.user_id}
									friend_view={props.friend_view}
								></ProfileTimeTable>
							</div>
							<div
								className="tab-pane fade"
								id="v-pills-visitor"
								role="tabpanel"
								aria-labelledby="v-pills-visitor-tab"
							>
								<Visitors
									user_id={props.user_id}
									friend_view={props.friend_view}
								></Visitors>
							</div>
							{props.friend_view ? (
								<div
									className="tab-pane fade"
									id="v-pills-setting"
									role="tabpanel"
									aria-labelledby="v-pills-setting-tab"
								>
									<Settings
										user_id={props.user_id}
										friend_view={props.friend_view}
									></Settings>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
