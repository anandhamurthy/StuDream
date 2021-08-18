import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
import { getUser } from "../Firebase/auth";

import Empty from "../Empty/Empty";

import { Chart } from "react-google-charts";

import "./Education.css";
import ExamCard from "./ExamCard";
import SubjectCard from "./SubjectCard";

function Education(props) {
	const [changeTab, setChangeTab] = useState(true);

	const [chartData, setChartData] = useState([]);

	const [type, setType] = useState("Exam");
	const [examName, setExamName] = useState("");
	const [examDate, setExamDate] = useState("");

	const [subjectName, setSubjectName] = useState("");
	const [subjectTotalMark, setSubjectTotalMark] = useState("");
	const [subjectMark, setSubjectMark] = useState("");
	const [examID, setExamID] = useState("Choose Exam");

	const [exams, setExams] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [error, setError] = useState(null);

	function changeMyTab() {
		setChangeTab(!changeTab);
	}

	useEffect(() => {
		//const uid = getUser().uid;
		return db
			.collection("User Items")
			.doc(props.user_id)
			.collection("My Exams")
			.onSnapshot((snapshot) => {
				const examItems = [];
				snapshot.forEach((doc) => {
					examItems.push({ ...doc.data(), id: doc.id });
				});
				setExams(examItems);
			});
	});

	function getSubjectMarks(exam_id) {
		changeMyTab();
		//const uid = getUser().uid;
		db.collection("User Items")
			.doc(props.user_id)
			.collection("My Subjects")
			.onSnapshot((snapshot) => {
				const subItems = [];
				const chartItems = [["Subjects", "Marks"]];
				snapshot.forEach((doc) => {
					if (doc.data().exam_id === exam_id) {
						subItems.push({ ...doc.data(), id: doc.id });
						chartItems.push([
							doc.data().subject_name,
							parseInt(doc.data().subject_marks),
						]);
					}
				});
				console.log(chartItems);
				setChartData(chartItems);
				setSubjects(subItems);
			});
		console.log(subjects);
	}

	const onExamSubmit = async (event) => {
		event.preventDefault();

		if (examName === "") {
			setError("Enter Exam Name..");
			return;
		}

		if (examDate === "") {
			setError("Enter Exam Date");
			return;
		}

		const submitButton = document.querySelector(".add-exam");

		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Exams")
			.doc().id;
		return db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Exams")
			.doc(key)
			.set({
				exam_name: examName,
				exam_date: examDate,
				user_id: user.uid,
				exam_id: key,
			})
			.then(() => {
				console.log("Document successfully written!");
				setExamDate("");
				setExamName("");
				setError(null);
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	const onSubjectSubmit = async (event) => {
		event.preventDefault();

		if (subjectName === "") {
			setError("Enter Subject Name..");
			return;
		}

		if (subjectTotalMark === "") {
			setError("Enter Subject Total Mark..");
			return;
		}

		if (subjectMark === "") {
			setError("Enter Subject Mark..");
			return;
		}

		if (examID === "Choose Exam") {
			setError("Enter Exam ID..");
			return;
		}

		const submitButton = document.querySelector(".add-subject");

		submitButton.disabled = true;

		var user = getUser();
		console.log(user.uid);
		const key = db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Subjects")
			.doc().id;
		return db
			.collection("User Items")
			.doc(user.uid)
			.collection("My Subjects")
			.doc(key)
			.set({
				subject_name: subjectName,
				subject_total_marks: subjectTotalMark,
				subject_marks: subjectMark,
				user_id: user.uid,
				subject_id: key,
				exam_id: examID,
			})
			.then(() => {
				console.log("Document successfully written!");
				setSubjectName("");
				setSubjectTotalMark("");
				setSubjectMark("");
				setError(null);
				setExamID("Choose Exam");
				submitButton.disabled = false;
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
				submitButton.disabled = false;
			});
	};

	return props.friend_view ? (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i className="fas fa-user-graduate"></i>
				<h3 className="m-2 text-dark">My Education</h3>
			</div>

			<div className="row align-items-center">
				<div className="p-2 col-lg-6 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4 exam_layout">
						{(() => {
							if (changeTab) {
								return (
									<div>
										<h4>My Exams</h4>
										<div className="lefttab">
											<div className=" list-group">
												<div className="d-flex flex-row flex-wrap justify-content-center">
													{exams.length ? (
														exams.map(
															(exam, index) => (
																<div
																	onClick={() => {
																		getSubjectMarks(
																			exam.exam_id
																		);
																	}}
																>
																	<ExamCard
																		item={
																			exam
																		}
																		index={
																			index
																		}
																	></ExamCard>
																</div>
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
								);
							} else {
								return (
									<div>
										<div className="d-flex justify-content-start align-items-center">
											<i
												onClick={changeMyTab}
												className="back fas fa-arrow-left"
											></i>
											<h3 className="m-2 text-dark">
												My Marks
											</h3>
										</div>
										<div className="lefttab">
											<div className=" list-group">
												<div className="d-flex flex-row flex-wrap justify-content-center">
													{subjects.length ? (
														subjects.map(
															(exam, index) => (
																<div>
																	<SubjectCard
																		item={
																			exam
																		}
																		index={
																			index
																		}
																	></SubjectCard>
																</div>
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
										{subjects.length ? (
											<div className="m-2">
												<Chart
													chartType="Bar"
													loader={
														<div>Loading Chart</div>
													}
													data={chartData}
													options={{
														chart: {
															title: "Exam Performance",
														},
													}}
												/>
											</div>
										) : (
											""
										)}
									</div>
								);
							}
						})()}
					</div>
				</div>

				<div className="p-2 d-md-block col-lg-6 order-lg-1">
					<div className=" shadow border-0 card p-4">
						<div className="card-body">
							<div>
								<h4 className="text-dark">Add {type}</h4>
								<p className="text-dark">Add a {type} item</p>

								<div className="input-group mb-3">
									<span
										className="shadow rounded-left border-0 input-group-text bg-white"
										id="basic-addon1"
									>
										<i className="fas fa-project-diagram"></i>
									</span>
									<select
										className="custom-select shadow rounded-right border-0 form-control"
										id="priority"
										onChange={(event) =>
											setType(event.target.value)
										}
										value={type}
									>
										<option value="Exam">Exam</option>
										<option value="Subject">Subject</option>
									</select>
								</div>

								{type === "Exam" ? (
									<div>
										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="fas fa-signature"></i>
											</span>
											<input
												type="text"
												className="shadow rounded-right border-0 form-control"
												placeholder="Exam Name"
												value={examName}
												onChange={(event) =>
													setExamName(
														event.target.value
													)
												}
											/>
										</div>

										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="far fa-calendar"></i>
											</span>
											<input
												type="date"
												className="shadow rounded-right border-0 form-control"
												placeholder="Exam Date"
												value={examDate}
												onChange={(event) =>
													setExamDate(
														event.target.value
													)
												}
											/>
										</div>

										{error}
										<div className="row">
											<div className="col-6">
												<button
													type="button"
													className="add-exam shadow border-0 rounded-0 btn btn-primary px-4"
													onClick={onExamSubmit}
												>
													Add Exam
												</button>
											</div>
										</div>
									</div>
								) : (
									<div>
										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="fas fa-tasks"></i>
											</span>
											<select
												className="custom-select shadow rounded-right border-0 form-control"
												id="exam-id"
												required
												value={examID}
												onChange={(event) =>
													setExamID(
														event.target.value
													)
												}
											>
												<option selected>
													Choose Exam
												</option>
												{exams.map((user, index) => (
													<option
														value={user.exam_id}
													>
														{user.exam_name}
													</option>
												))}
											</select>
										</div>
										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="fas fa-check"></i>
											</span>
											<input
												type="text"
												className="shadow rounded-right border-0 form-control"
												placeholder="Subject Name"
												value={subjectName}
												onChange={(event) =>
													setSubjectName(
														event.target.value
													)
												}
											/>
										</div>
										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="fas fa-check"></i>
											</span>
											<input
												type="number"
												className="shadow rounded-right border-0 form-control"
												placeholder="Subject Marks"
												value={subjectMark}
												onChange={(event) =>
													setSubjectMark(
														event.target.value
													)
												}
											/>
										</div>

										<div className="input-group mb-3">
											<span
												className="shadow rounded-left border-0 input-group-text bg-white"
												id="basic-addon1"
											>
												<i className="fas fa-check"></i>
											</span>
											<input
												type="number"
												className="shadow rounded-right border-0 form-control"
												placeholder="Subject Total Marks"
												value={subjectTotalMark}
												onChange={(event) =>
													setSubjectTotalMark(
														event.target.value
													)
												}
											/>
										</div>
										{error}
										<div className="row">
											<div className="col-6">
												<button
													type="button"
													className="add-subject shadow border-0 rounded-0 btn btn-primary px-4"
													onClick={onSubjectSubmit}
												>
													Add Subject
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="p-5 container-fluid">
			<div className="d-flex justify-content-start align-items-center">
				<i className="fas fa-user-graduate"></i>
				<h3 className="m-2 text-dark">Education</h3>
			</div>

			<div className="row align-items-center">
				<div className="p-2 col-lg-12 order-lg-1 mt-5 mt-lg-0">
					<div className=" shadow border-0 card p-4 exam_layout">
						{(() => {
							if (changeTab) {
								return (
									<div>
										<h4>My Exams</h4>
										<div className="lefttab">
											<div className=" list-group">
												<div className="d-flex flex-row flex-wrap justify-content-center">
													{exams.length ? (
														exams.map(
															(exam, index) => (
																<div
																	onClick={() => {
																		getSubjectMarks(
																			exam.exam_id
																		);
																	}}
																>
																	<ExamCard
																		item={
																			exam
																		}
																		index={
																			index
																		}
																	></ExamCard>
																</div>
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
								);
							} else {
								return (
									<div>
										<div className="d-flex justify-content-start align-items-center">
											<i
												onClick={changeMyTab}
												className="back fas fa-arrow-left"
											></i>
											<h3 className="m-2 text-dark">
												Marks
											</h3>
										</div>
										<div className="lefttab">
											<div className=" list-group">
												<div className="d-flex flex-row flex-wrap justify-content-center">
													{subjects.length ? (
														subjects.map(
															(exam, index) => (
																<div>
																	<SubjectCard
																		item={
																			exam
																		}
																		index={
																			index
																		}
																	></SubjectCard>
																</div>
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
										{subjects.length ? (
											<div className="m-2">
												<Chart
													chartType="Bar"
													loader={
														<div>Loading Chart</div>
													}
													data={chartData}
													options={{
														chart: {
															title: "Exam Performance",
														},
													}}
												/>
											</div>
										) : (
											""
										)}
									</div>
								);
							}
						})()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Education;
