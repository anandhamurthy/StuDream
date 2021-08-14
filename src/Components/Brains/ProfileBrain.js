import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import empty from "../Img/empty-box.gif";

import "./Brains.css";
import BrainCard from "./BrainCard";
import Empty from "../Empty/Empty";

function ProfileBrain(props) {
	const [search, setSearch] = useState("");
	const [brain_1, setBrain1] = useState([]);
	const [brain_2, setBrain2] = useState([]);
	const [brain_3, setBrain3] = useState([]);
	const [brain_4, setBrain4] = useState([]);
	const [brain_5, setBrain5] = useState([]);
	const [brain_6, setBrain6] = useState([]);
	const [brain_7, setBrain7] = useState([]);
	const [search_brain, setSearchBrain] = useState([]);

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

				console.log(brain1);
				console.log(brain2);
				console.log(brain3);
				console.log(brain4);
			});
	}, []);

	return (
		<div className="border-0 card p-2">
			<div>
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button
							class="nav-link active"
							id="br1-tab"
							data-bs-toggle="tab"
							data-bs-target="#br1"
							type="button"
							role="tab"
							aria-controls="br1"
							aria-selected="true"
						>
							Brain 1
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br2-tab"
							data-bs-toggle="tab"
							data-bs-target="#br2"
							type="button"
							role="tab"
							aria-controls="br2"
							aria-selected="false"
						>
							Brain 2
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br3-tab"
							data-bs-toggle="tab"
							data-bs-target="#br3"
							type="button"
							role="tab"
							aria-controls="br3"
							aria-selected="false"
						>
							Brain 3
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br4-tab"
							data-bs-toggle="tab"
							data-bs-target="#br4"
							type="button"
							role="tab"
							aria-controls="br4"
							aria-selected="false"
						>
							Brain 4
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br5-tab"
							data-bs-toggle="tab"
							data-bs-target="#br5"
							type="button"
							role="tab"
							aria-controls="br5"
							aria-selected="false"
						>
							Brain 5
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br6-tab"
							data-bs-toggle="tab"
							data-bs-target="#br6"
							type="button"
							role="tab"
							aria-controls="br6"
							aria-selected="false"
						>
							Brain 6
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="br7-tab"
							data-bs-toggle="tab"
							data-bs-target="#br7"
							type="button"
							role="tab"
							aria-controls="br7"
							aria-selected="false"
						>
							Brain 7
						</button>
					</li>
				</ul>
			</div>

			<div>
				<div class="tab-content" id="myTabContent">
					<div
						class="tab-pane fade show active"
						id="br1"
						role="tabpanel"
						aria-labelledby="br1-tab"
					>
						{brain_1.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className=" list-group ">
								{brain_1.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_1.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
										<img src={empty} width={"25%"} alt="" />
									</div>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="br2"
						role="tabpanel"
						aria-labelledby="br2-tab"
					>
						{brain_2.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className=" list-group ">
								{brain_2.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_2.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
						class="tab-pane fade"
						id="br3"
						role="tabpanel"
						aria-labelledby="br3-tab"
					>
						{brain_3.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className="list-group">
								{brain_3.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_3.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
						class="tab-pane fade"
						id="br4"
						role="tabpanel"
						aria-labelledby="br4-tab"
					>
						{brain_4.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className="list-group ">
								{brain_4.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_4.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
						class="tab-pane fade"
						id="br5"
						role="tabpanel"
						aria-labelledby="br5-tab"
					>
						{brain_5.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className=" list-group ">
								{brain_5.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_5.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
						class="tab-pane fade"
						id="br6"
						role="tabpanel"
						aria-labelledby="br6-tab"
					>
						{brain_6.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className=" list-group ">
								{brain_6.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_6.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
						class="tab-pane fade"
						id="br7"
						role="tabpanel"
						aria-labelledby="br7-tab"
					>
						{brain_7.length != 0 ? (
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
									<i className="fas fa-search"></i>
								</span>
							</div>
						) : (
							""
						)}
						<div className="brain-left-tab">
							<div className=" list-group ">
								{brain_7.length != 0 ? (
									<div>
										{search.length != 0 ? (
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{search_brain.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
											<div class="rightbox brain-bg rounded mx-2">
												<div class="rb-container">
													<ul class="rb">
														{brain_7.map(
															(item, index) => (
																<BrainCard
																	item={item}
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
	);
}

export default ProfileBrain;
