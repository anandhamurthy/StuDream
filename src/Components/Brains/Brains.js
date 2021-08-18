import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import "./Brains.css";
import BrainCard from "./BrainCard";
import Empty from "../Empty/Empty";

function Brains(props) {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [message, setMessage] = useState("");
	const [brain, setBrain] = useState("Choose Brain ID");

	const [error, setError] = useState(null);
	const [search1, setSearch1] = useState("");
	const [search2, setSearch2] = useState("");
	const [search3, setSearch3] = useState("");
	const [search4, setSearch4] = useState("");
	const [search5, setSearch5] = useState("");
	const [search6, setSearch6] = useState("");
	const [search7, setSearch7] = useState("");

	const [brain_1, setBrain1] = useState([]);
	const [brain_2, setBrain2] = useState([]);
	const [brain_3, setBrain3] = useState([]);
	const [brain_4, setBrain4] = useState([]);
	const [brain_5, setBrain5] = useState([]);
	const [brain_6, setBrain6] = useState([]);
	const [brain_7, setBrain7] = useState([]);
	const [searchBrain1, setSearchBrain1] = useState([]);
	const [searchBrain2, setSearchBrain2] = useState([]);
	const [searchBrain3, setSearchBrain3] = useState([]);
	const [searchBrain4, setSearchBrain4] = useState([]);
	const [searchBrain5, setSearchBrain5] = useState([]);
	const [searchBrain6, setSearchBrain6] = useState([]);
	const [searchBrain7, setSearchBrain7] = useState([]);

	const [myBrain, setMyBrain] = useState([]);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("Users")
			.doc(uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setMyBrain(doc.data().brain_names);
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	}, []);

	useEffect(() => {
		const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(uid)
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

				console.log(brain1);
				console.log(brain2);
				console.log(brain3);
				console.log(brain4);
			});
	}, []);

	const onBrain1Search = async (event) => {
		event.preventDefault();

		setSearchBrain1(brain_1);

		if (search1 === "") {
			setError("Enter Something.");
			setSearchBrain1(brain_1);
			return;
		}
		const result = brain_1.filter((item) =>
			item.title.toLowerCase().includes(search1.toLowerCase())
		);
		setSearchBrain1(result);
	};

	const onBrain2Search = async (event) => {
		event.preventDefault();

		setSearchBrain2(brain_2);

		if (search2 === "") {
			setError("Enter Something.");
			setSearchBrain2(brain_2);
			return;
		}
		const result = brain_2.filter((item) =>
			item.title.toLowerCase().includes(search2.toLowerCase())
		);
		setSearchBrain2(result);
	};

	const onBrain3Search = async (event) => {
		event.preventDefault();

		setSearchBrain3(brain_3);

		if (search3 === "") {
			setError("Enter Something.");
			setSearchBrain3(brain_3);
			return;
		}
		const result = brain_3.filter((item) =>
			item.title.toLowerCase().includes(search3.toLowerCase())
		);
		setSearchBrain3(result);
	};

	const onBrain4Search = async (event) => {
		event.preventDefault();

		setSearchBrain4(brain_4);

		if (search4 === "") {
			setError("Enter Something.");
			setSearchBrain4(brain_4);
			return;
		}
		const result = brain_4.filter((item) =>
			item.title.toLowerCase().includes(search4.toLowerCase())
		);
		setSearchBrain4(result);
	};

	const onBrain5Search = async (event) => {
		event.preventDefault();

		setSearchBrain5(brain_5);

		if (search5 === "") {
			setError("Enter Something.");
			setSearchBrain5(brain_5);
			return;
		}
		const result = brain_5.filter((item) =>
			item.title.toLowerCase().includes(search5.toLowerCase())
		);
		setSearchBrain5(result);
	};

	const onBrain6Search = async (event) => {
		event.preventDefault();

		setSearchBrain6(brain_6);

		if (search6 === "") {
			setError("Enter Something.");
			setSearchBrain6(brain_6);
			return;
		}
		const result = brain_6.filter((item) =>
			item.title.toLowerCase().includes(search6.toLowerCase())
		);
		setSearchBrain6(result);
	};

	const onBrain7Search = async (event) => {
		event.preventDefault();

		setSearchBrain7(brain_7);

		if (search7 === "") {
			setError("Enter Something.");
			setSearchBrain7(brain_7);
			return;
		}
		const result = brain_7.filter((item) =>
			item.title.toLowerCase().includes(search7.toLowerCase())
		);
		setSearchBrain7(result);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		if (title === "") {
			setError("Enter Title..");
			return;
		}

		if (date === "") {
			setError("Enter date..");
			return;
		}

		if (message === "") {
			setError("Enter message..");
			return;
		}

		if (brain === "Choose Brain ID") {
			setError("Enter brain id..");
			return;
		}

		const submitButton = document.querySelector(".add_pin");

		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Brains")
			.doc().id;
		return db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Brains")
			.doc(key)
			.set({
				title: title,
				message: message,
				brain: brain,
				date: date,
				user_id: user.uid,
				pin_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				setTitle("");
				setDate("");
				setMessage("");
				setBrain("Choose Brain ID");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	return (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i className="fas fa-brain"></i>
				<h3 className="m-2 text-dark">My Brains</h3>
			</div>

			<div className="row align-items-center">
				<div className="p-2 col-lg-6 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4">
						<div>
							<ul
								className="nav nav-tabs"
								id="myTab"
								role="tablist"
							>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link active"
										id="br1-tab"
										data-bs-toggle="tab"
										data-bs-target="#br1"
										type="button"
										role="tab"
										aria-controls="br1"
										aria-selected="true"
									>
										{myBrain[0]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br2-tab"
										data-bs-toggle="tab"
										data-bs-target="#br2"
										type="button"
										role="tab"
										aria-controls="br2"
										aria-selected="false"
									>
										{myBrain[1]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br3-tab"
										data-bs-toggle="tab"
										data-bs-target="#br3"
										type="button"
										role="tab"
										aria-controls="br3"
										aria-selected="false"
									>
										{myBrain[2]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br4-tab"
										data-bs-toggle="tab"
										data-bs-target="#br4"
										type="button"
										role="tab"
										aria-controls="br4"
										aria-selected="false"
									>
										{myBrain[3]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br5-tab"
										data-bs-toggle="tab"
										data-bs-target="#br5"
										type="button"
										role="tab"
										aria-controls="br5"
										aria-selected="false"
									>
										{myBrain[4]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br6-tab"
										data-bs-toggle="tab"
										data-bs-target="#br6"
										type="button"
										role="tab"
										aria-controls="br6"
										aria-selected="false"
									>
										{myBrain[5]}
									</button>
								</li>
								<li className="nav-item" role="presentation">
									<button
										className="nav-link"
										id="br7-tab"
										data-bs-toggle="tab"
										data-bs-target="#br7"
										type="button"
										role="tab"
										aria-controls="br7"
										aria-selected="false"
									>
										{myBrain[6]}
									</button>
								</li>
							</ul>
						</div>

						<div>
							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="br1"
									role="tabpanel"
									aria-labelledby="br1-tab"
								>
									{brain_1.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch1(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain1Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab">
										<div className="list-group">
											{brain_1.length !== 0 ? (
												<div>
													{search1.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain1.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_1.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
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
								<div
									className="tab-pane fade"
									id="br2"
									role="tabpanel"
									aria-labelledby="br2-tab"
								>
									{brain_2.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch2(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain2Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_2.length !== 0 ? (
												<div>
													{search2.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain2.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_2.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="br3"
									role="tabpanel"
									aria-labelledby="br3-tab"
								>
									{brain_3.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch3(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain3Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_3.length !== 0 ? (
												<div>
													{search3.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain3.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_3.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="br4"
									role="tabpanel"
									aria-labelledby="br4-tab"
								>
									{brain_4.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch4(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain4Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_4.length !== 0 ? (
												<div>
													{search4.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain4.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_4.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="br5"
									role="tabpanel"
									aria-labelledby="br5-tab"
								>
									{brain_5.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch5(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain5Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_5.length !== 0 ? (
												<div>
													{search5.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain5.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_5.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="br6"
									role="tabpanel"
									aria-labelledby="br6-tab"
								>
									{brain_6.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch6(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain6Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_6.length !== 0 ? (
												<div>
													{search6.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain6.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_6.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="br7"
									role="tabpanel"
									aria-labelledby="br7-tab"
								>
									{brain_7.length !== 0 ? (
										<div className="input-group mb-3">
											<input
												type="text"
												className="shadow-sm rounded-right border-0 form-control"
												placeholder="search.."
												onChange={(event) =>
													setSearch7(
														event.target.value
													)
												}
											/>
											<span
												className="shadow-sm rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i
													className="fas fa-search"
													onClick={onBrain7Search}
												></i>
											</span>
										</div>
									) : (
										""
									)}
									<div className="brain-left-tab ">
										<div className=" list-group ">
											{brain_7.length !== 0 ? (
												<div>
													{search7.length !== 0 ? (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{searchBrain7.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													) : (
														<div className="rightbox brain-bg rounded mx-2">
															<div className="rb-container">
																<ul className="rb">
																	{brain_7.map(
																		(
																			item,
																			index
																		) => (
																			<BrainCard
																				item={
																					item
																				}
																				user_id={
																					props.user_id
																				}
																				friend_view={
																					props.friend_view
																				}
																			></BrainCard>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											) : (
												<Empty></Empty>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-2 d-md-block col-lg-6 order-lg-1">
					<div className="shadow border-0 card p-4">
						<div className="card-body">
							<h4 className="text-dark">Add Pin</h4>
							<p className="text-dark">Add a pin item</p>

							<div className="input-group mb-3">
								<span
									className="shadow rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i className="fas fa-project-diagram"></i>
								</span>
								<select
									className="custom-select shadow rounded-right border-0 form-control"
									id="brain_id"
									required
									value={brain}
									onChange={(event) =>
										setBrain(event.target.value)
									}
								>
									<option selected>Choose Brain ID</option>
									{myBrain.map((item, index) => (
										<option value={"Brain " + (index + 1)}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div className="input-group mb-3">
								<span
									className="shadow rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i className="far fa-calendar-alt"></i>
								</span>
								<input
									type="date"
									className="shadow rounded-right border-0 form-control"
									required
									value={date}
									onChange={(event) =>
										setDate(event.target.value)
									}
								/>
							</div>
							<div className="input-group mb-3">
								<span
									className="shadow rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i className="fas fa-thumbtack"></i>
								</span>
								<input
									type="text"
									className="shadow rounded-right border-0 form-control"
									placeholder="Title"
									required
									value={title}
									onChange={(event) =>
										setTitle(event.target.value)
									}
								/>
							</div>
							<div className="input-group mb-3">
								<span
									className="shadow rounded-left border-0 input-group-text bg-white"
									id="basic-addon1"
								>
									<i className="far fa-sticky-note"></i>
								</span>
								<textarea
									type="text"
									rows="3"
									className="shadow rounded-right border-0 form-control"
									placeholder="Add Message.."
									required
									value={message}
									onChange={(event) =>
										setMessage(event.target.value)
									}
								/>
							</div>

							{error}
							<div className="row">
								<div className="col-6">
									<button
										type="button"
										onClick={onSubmit}
										className="add_pin shadow border-0 rounded-0 btn btn-primary px-4"
									>
										Add Pin
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Brains;
