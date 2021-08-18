import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import Empty from "../Empty/Empty";
import PeriodCard from "./PeriodCard";

function ProfileTimeTable(props) {
	const [day_1, setDay1] = useState([]);
	const [day_2, setDay2] = useState([]);
	const [day_3, setDay3] = useState([]);
	const [day_4, setDay4] = useState([]);
	const [day_5, setDay5] = useState([]);
	const [day_6, setDay6] = useState([]);
	const [day_7, setDay7] = useState([]);

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My TimeTable")
			.onSnapshot((snapshot) => {
				const day1 = [];
				const day2 = [];
				const day3 = [];
				const day4 = [];
				const day5 = [];
				const day6 = [];
				const day7 = [];
				snapshot.forEach((doc) => {
					if (doc.data().day === "Monday")
						day1.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Tuesday")
						day2.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Wednesday")
						day3.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Thursday")
						day4.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Friday")
						day5.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Saturday")
						day6.push({ ...doc.data(), id: doc.id });
					else if (doc.data().day === "Sunday")
						day7.push({ ...doc.data(), id: doc.id });
				});
				setDay1(day1);
				setDay2(day2);
				setDay3(day3);
				setDay4(day4);
				setDay5(day5);
				setDay6(day6);
				setDay7(day7);

				console.log(day1);
				console.log(day2);
				console.log(day3);
				console.log(day4);
			});
	});

	return (
		<div className="border-0 p-2">
			<div>
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button
							class="nav-link active"
							id="mon-tab"
							data-bs-toggle="tab"
							data-bs-target="#mon"
							type="button"
							role="tab"
							aria-controls="mon"
							aria-selected="true"
						>
							Monday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="tue-tab"
							data-bs-toggle="tab"
							data-bs-target="#tue"
							type="button"
							role="tab"
							aria-controls="tue"
							aria-selected="false"
						>
							Tuesday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="wed-tab"
							data-bs-toggle="tab"
							data-bs-target="#wed"
							type="button"
							role="tab"
							aria-controls="wed"
							aria-selected="false"
						>
							Wednesday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="thu-tab"
							data-bs-toggle="tab"
							data-bs-target="#thu"
							type="button"
							role="tab"
							aria-controls="thu"
							aria-selected="false"
						>
							Thursday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="fri-tab"
							data-bs-toggle="tab"
							data-bs-target="#fri"
							type="button"
							role="tab"
							aria-controls="fri"
							aria-selected="false"
						>
							Friday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="sat-tab"
							data-bs-toggle="tab"
							data-bs-target="#sat"
							type="button"
							role="tab"
							aria-controls="sat"
							aria-selected="false"
						>
							Saturday
						</button>
					</li>
					<li class="nav-item" role="presentation">
						<button
							class="nav-link"
							id="sun-tab"
							data-bs-toggle="tab"
							data-bs-target="#sun"
							type="button"
							role="tab"
							aria-controls="sun"
							aria-selected="false"
						>
							Sunday
						</button>
					</li>
				</ul>
			</div>

			<div>
				<div class="tab-content" id="myTabContent">
					<div
						class="tab-pane fade show active"
						id="mon"
						role="tabpanel"
						aria-labelledby="mon-tab"
					>
						<div className="lefttab">
							<div className="list-group">
								{day_1.length !== 0 ? (
									<div>
										{day_1.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
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
					<div
						class="tab-pane fade"
						id="tue"
						role="tabpanel"
						aria-labelledby="tue-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_2.length !== 0 ? (
									<div>
										{day_2.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
									</div>
								) : (
									<Empty></Empty>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="wed"
						role="tabpanel"
						aria-labelledby="wed-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_3.length !== 0 ? (
									<div>
										{day_3.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
									</div>
								) : (
									<Empty></Empty>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="thu"
						role="tabpanel"
						aria-labelledby="thu-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_4.length !== 0 ? (
									<div>
										{day_4.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
									</div>
								) : (
									<Empty></Empty>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="fri"
						role="tabpanel"
						aria-labelledby="fri-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_5.length !== 0 ? (
									<div>
										{day_5.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
									</div>
								) : (
									<Empty></Empty>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="sat"
						role="tabpanel"
						aria-labelledby="sat-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_6.length !== 0 ? (
									<div>
										{day_6.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
									</div>
								) : (
									<Empty></Empty>
								)}
							</div>
						</div>
					</div>
					<div
						class="tab-pane fade"
						id="sun"
						role="tabpanel"
						aria-labelledby="sun-tab"
					>
						<div className="lefttab ">
							<div className=" list-group ">
								{day_7.length !== 0 ? (
									<div>
										{day_7.map((item, index) => (
											<PeriodCard
												item={item}
												user_id={props.user_id}
												friend_view={props.friend_view}
											></PeriodCard>
										))}
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

export default ProfileTimeTable;
