import React, { useState, useEffect } from "react";
import { storage } from "../Firebase/firebase";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";
import AchievementCard from "./AchievementCard";
import Empty from "../Empty/Empty";

function Achievement(props) {
	const [progressBar, setProgressBar] = useState(null);

	const [uploadImages, setUploadImages] = useState(null);

	const [eventName, seteventName] = useState("");
	const [eventPlace, seteventPlace] = useState("");
	const [eventDate, seteventDate] = useState("");
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	const [images, setImages] = useState([]);
	const [urls, setUrls] = useState([]);
	const [progress, setProgress] = useState(0);
	const [achievements, setAchievements] = useState([]);
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
			setError("Enter Something.");
			setSearchAchievement(achievements);
			return;
		}
		const result = achievements.filter((item) =>
			item.event_name.includes(search)
		);
		setSearchAchievement(result);
	};

	const handleFilesChange = (event) => {
		for (let i = 0; i < event.target.files.length; i++) {
			const newImage = event.target.files[i];
			newImage["id"] = Math.random();
			setImages((prevState) => [...prevState, newImage]);
		}
	};

	const handleUpload = () => {
		const promises = [];
		setProgressBar(true);
		images.map((image) => {
			const uploadTask = storage.ref(`images/${image.name}`).put(image);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("images")
						.child(image.name)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => {
				alert("Uploaded Successfully");
				setUploadImages(null);
			})
			.catch((err) => console.log(err));
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (eventName === "") {
			setError("Enter Event Name..");
			return;
		}

		if (eventPlace === "") {
			setError("Enter Event Place..");
			return;
		}

		if (eventDate === "") {
			setError("Enter Event Date..");
			return;
		}

		const submitButton = document.querySelector(".add_achievement");

		submitButton.disabled = true;
		setProgressBar(null);

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Achievements")
			.doc().id;
		return db
			.collection("Todo")
			.doc(user.uid)
			.collection("My Achievements")
			.doc(key)
			.set({
				event_name: eventName,
				event_date: eventDate,
				event_place: eventPlace,
				event_images: urls,
				user_id: user.uid,
				achievement_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				seteventDate("");
				seteventName("");
				seteventPlace("");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	return props.friend_View ? (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i class="fas fa-trophy"></i>
				<h3 className="m-2 text-dark">My Achievements</h3>
			</div>
			<div className="row align-items-center">
				<div className="p-2 col-lg-6 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4">
						<div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="shadow-sm rounded-right border-0 form-control"
									placeholder="search.."
									onChange={(event) =>
										setSearch(event.target.value)
									}
								/>
								<span
									className="shadow-sm rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i
										class="fas fa-search"
										onClick={onSearch}
									></i>
								</span>
							</div>
						</div>

						<div className="lefttab">
							<div className=" list-group">
								{achievements.length != 0 ? (
									<div>
										{search.length != 0
											? searchAchievement.map(
													(item, index) => (
														<AchievementCard
															item={item}
														></AchievementCard>
													)
											  )
											: achievements.map(
													(item, index) => (
														<AchievementCard
															item={item}
														></AchievementCard>
													)
											  )}
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
				<div className="p-2 d-md-block col-lg-6 order-lg-1">
					<div className=" shadow border-0 card p-4">
						<div className="card-body">
							<div>
								<h4 className="text-dark">Add Achievement</h4>
								<p className="my-2 text-dark">
									Add an event info
								</p>
								{progressBar ? (
									<progress value={progress} max="100" />
								) : (
									""
								)}

								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i class="fas fa-trophy"></i>
									</span>
									<input
										type="text"
										className="shadow rounded-right border-0 form-control"
										placeholder="Event Name"
										onChange={(event) =>
											seteventName(event.target.value)
										}
									/>
								</div>
								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i class="far fa-calendar"></i>
									</span>
									<input
										type="datetime-local"
										className="shadow rounded-right border-0 form-control"
										placeholder="Event Date"
										onChange={(event) =>
											seteventDate(event.target.value)
										}
									/>
								</div>

								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i class="fas fa-map-marker-alt"></i>
									</span>
									<input
										type="text"
										className="shadow rounded-right border-0 form-control"
										placeholder="Event Place"
										onChange={(event) =>
											seteventPlace(event.target.value)
										}
									/>
								</div>

								<p>
									Add Event Credential | Award | Badge |
									Certificate | Photos
								</p>

								<div className="input-group mb-3">
									<input
										type="file"
										multiple
										accept="image/png, image/jpeg"
										className="shadow rounded-right border-0 form-control"
										onChange={handleFilesChange}
									/>
								</div>
								{error}
								<div className="row">
									<div className="col-6">
										{images.length ? (
											uploadImages ? (
												<button
													type="button"
													onClick={handleUpload}
													className="shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
												>
													Upload
												</button>
											) : (
												""
											)
										) : (
											""
										)}
										<button
											type="button"
											onClick={onSubmit}
											className="add_achievement shadow border-0 rounded-0 mx-2 btn btn-primary px-4"
										>
											Add Achievement
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i class="fas fa-trophy"></i>
				<h3 className="m-2 text-dark">My Achievements</h3>
			</div>
			<div className="row align-items-center">
				<div className="p-2 col-lg-12 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4">
						<div>
							<div className="input-group mb-3">
								<input
									type="text"
									className="shadow-sm rounded-right border-0 form-control"
									placeholder="search.."
									onChange={(event) =>
										setSearch(event.target.value)
									}
								/>
								<span
									className="shadow-sm rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i
										class="fas fa-search"
										onClick={onSearch}
									></i>
								</span>
							</div>
						</div>

						<div className="lefttab">
							<div className=" list-group">
								{achievements.length != 0 ? (
									<div>
										{search.length != 0
											? searchAchievement.map(
													(item, index) => (
														<AchievementCard
															item={item}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></AchievementCard>
													)
											  )
											: achievements.map(
													(item, index) => (
														<AchievementCard
															item={item}
															user_id={
																props.user_id
															}
															friend_view={
																props.friend_view
															}
														></AchievementCard>
													)
											  )}
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
			</div>
		</div>
	);
}

export default Achievement;
