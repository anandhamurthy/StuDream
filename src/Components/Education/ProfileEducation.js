import React, { useState, useEffect } from "react";

import { db } from "../Firebase/firebase";
//import { getUser } from "../Firebase/auth";

import { Chart } from "react-google-charts";

import "./Education.css";
import ExamCard from "./ExamCard";
import SubjectCard from "./SubjectCard";
import Empty from "../Empty/Empty";

function ProfileEducation(props) {
	const [changeTab, setChangeTab] = useState(true);

	const [chartData, setChartData] = useState([]);

	const [exams, setExams] = useState([]);
	const [subjects, setSubjects] = useState([]);

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

	return (
		<div className="border-0 card p-2">
			{(() => {
				if (changeTab) {
					return (
						<div>
							<h4>My Exams</h4>
							<div className="lefttab">
								<div className=" list-group">
									<div className="d-flex flex-row flex-wrap justify-content-center">
										{exams.length ? (
											exams.map((exam, index) => (
												<div
													onClick={() => {
														getSubjectMarks(
															exam.exam_id
														);
													}}
												>
													<ExamCard
														item={exam}
														index={index}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></ExamCard>
												</div>
											))
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
								<h3 className="m-2 text-dark">My Marks</h3>
							</div>
							<div className="lefttab">
								<div className=" list-group">
									<div className="d-flex flex-row flex-wrap justify-content-center">
										{subjects.length ? (
											subjects.map((exam, index) => (
												<div>
													<SubjectCard
														item={exam}
														index={index}
														user_id={props.user_id}
														friend_view={
															props.friend_view
														}
													></SubjectCard>
												</div>
											))
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
										loader={<div>Loading Chart</div>}
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
	);
}

export default ProfileEducation;
