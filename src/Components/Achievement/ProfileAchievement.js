import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import AchievementCard from "./AchievementCard";
import Empty from "../Empty/Empty";

function ProfileAchievement(props) {
	const [achievements, setAchievements] = useState([]);
	const [search, setSearch] = useState("");
	const [searchAchievement, setSearchAchievement] = useState([]);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Todo")
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
							<i class="fas fa-search" onClick={onSearch}></i>
						</span>
					</div>
				</div>
				<div className="lefttab">
					<div className=" list-group">
						{achievements.length != 0 ? (
							<div>
								{search.length != 0
									? searchAchievement.map((item, index) => (
											<AchievementCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></AchievementCard>
									  ))
									: achievements.map((item, index) => (
											<AchievementCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></AchievementCard>
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
		</div>
	);
}

export default ProfileAchievement;
