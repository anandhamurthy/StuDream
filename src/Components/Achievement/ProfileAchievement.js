import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import AchievementCard from "./AchievementCard";
import Empty from "../Empty/Empty";

function ProfileAchievement(props) {
	const [achievements, setAchievements] = useState([]);
	const [search, setSearch] = useState("");
	const [searchAchievement, setSearchAchievement] = useState([]);

	const [achievementImages, setAchievementImages] = useState([]);
	const [showImages, setShowImages] = useState(false);

	function changeMyTab(ach_images, show_val) {
		setShowImages(show_val);
		setAchievementImages(ach_images);
	}

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My Achievements")
			.onSnapshot((snapshot) => {
				const items = [];
				snapshot.forEach((doc) => {
					items.push({ ...doc.data(), id: doc.id });
				});
				setAchievements(items);
			});
	}, []);

	const onSearch = async (event) => {
		event.preventDefault();

		setSearchAchievement(achievements);

		if (search === "") {
			alert("Enter Something.");
			setSearchAchievement(achievements);
			return;
		}
		const result = achievements.filter((item) =>
			item.event_name.includes(search)
		);
		setSearchAchievement(result);
	};

	return (
		<div className=" border-0 card p-2">
			<div>
				<div>
					<div className="input-group mb-3">
						<input
							type="text"
							className="shadow-sm rounded-right border-0 form-control"
							placeholder="search.."
							onChange={(event) => setSearch(event.target.value)}
						/>
						<span
							className="shadow-sm rounded-left border-0 input-group-text bg-white"
							id="basic-addon1"
						>
							<i className="fas fa-search" onClick={onSearch}></i>
						</span>
					</div>
				</div>
				<div className="lefttab">
					<div className=" list-group">
						{achievements.length != 0 ? (
							<div>
								{search.length != 0
									? searchAchievement.map((item, index) => (
											<div
												onClick={() => {
													changeMyTab(
														item.event_images,
														true
													);
												}}
											>
												<AchievementCard
													item={item}
													user_id={props.user_id}
													friend_view={
														props.friend_view
													}
												></AchievementCard>
											</div>
									  ))
									: achievements.map((item, index) => (
											<div
												onClick={() => {
													changeMyTab(
														item.event_images,
														true
													);
												}}
											>
												<AchievementCard
													item={item}
													user_id={props.user_id}
													friend_view={
														props.friend_view
													}
												></AchievementCard>
											</div>
									  ))}
							</div>
						) : (
							<div className="m-auto p-5 d-flex align-items-center justify-content-center">
								<Empty></Empty>
							</div>
						)}
					</div>
				</div>
			</div>
			{showImages && achievementImages.length != 0 ? (
				<div>
					<div className="d-flex justify-content-start align-items-center">
						<i
							onClick={() => {
								changeMyTab([], false);
							}}
							className="back fas fa-arrow-left"
						></i>
						<h3 className="m-2 text-dark">Achievement Photos</h3>
					</div>
					<div className="shadow card p-4 border-0">
						<div className="lefttab">
							<div className=" list-group">
								<div className="d-flex justify-content-between flex-wrap">
									{achievementImages.length ? (
										achievementImages.map(
											(img_item, index) => (
												<img
													className="achievement-img img-fluid rounded shadow-sm"
													src={img_item}
													alt=""
												></img>
											)
										)
									) : (
										<div className="m-auto p-5 d-flex align-items-center justify-content-center">
											<Empty></Empty>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default ProfileAchievement;
