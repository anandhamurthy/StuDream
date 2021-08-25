import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import main_img_1 from "../Img/main_img_1.png";

import side_one from "../Img/about_img.png";
import todo_img from "../Img/todo_img.png";
import timetable_img from "../Img/timetable_img.png";
import achievement_img from "../Img/achievement_img.png";
import education_img from "../Img/education_img.png";

import "./About.css";
import Review from "../Review/Review";

function About() {
	return (
		<div>
			<Navbar></Navbar>
			<div className="container-fluid center-y my-bg">
				<div className="row align-items-center ">
					<div className="py-1 col-lg-6 order-lg-1 mt-5 mt-lg-0">
						<div className="py-1 px-md-5 mt-5 mt-lg-0">
							<h1>
								StuDream makes students to manage all their
								Workflows.
							</h1>
							<h4 className="mt-4 my-sub-text">
								Add Inspirations, Achievements, Todo Tasks, Exam
								marks, Timetables, etc. All the things are
								managable and brought into 4 Sides of the
								virtual room in StuDream.
							</h4>
						</div>
					</div>

					<div className="d-md-block col-lg-6 order-lg-2">
						<div className="p-2 d-flex justify-content-center">
							<img
								className="img-fluid "
								src={main_img_1}
								alt=""
							/>
						</div>
					</div>
				</div>

				<div>
					<div className="p-2 d-flex flex-column justify-content-center">
						<h1 className="text-center">
							It's all 4 sides of your Room, to manage your
							Activities.
						</h1>
						<h4 className="mt-4 text-center my-sub-text">
							Starting with Front, moving forward to your
							Inspiration, Work management, Achievement, and Brain
							Management sides.
						</h4>
					</div>
				</div>

				<div>
					<div className="d-md-block col-lg-12 order-lg-2">
						<div className="p-2 d-flex justify-content-center">
							<img className="img-fluid" src={side_one} alt="" />
						</div>
					</div>
				</div>

				<div className="row align-items-center">
					<div className="py-1 col-lg-6 order-lg-1">
						<div className="py-1 px-md-5">
							<h1>StuDream Todo.</h1>
							<h4 className="mt-4 my-sub-text">
								A Task manager, with 3 categories like todo,
								doing, completed for organizing the workflows
								without an incomplete.
							</h4>
						</div>
					</div>

					<div className="d-md-block col-lg-6 order-lg-2">
						<div className="p-2 d-flex justify-content-center">
							<img className="img-fluid " src={todo_img} alt="" />
						</div>
					</div>
				</div>

				<div className="row align-items-center">
					<div className="d-md-block col-lg-6 order-lg-1">
						<div className="p-2 d-flex justify-content-center">
							<img
								className="img-fluid "
								src={timetable_img}
								alt=""
							/>
						</div>
					</div>

					<div className="py-1 col-lg-6 order-lg-2">
						<div className="py-1 px-md-5">
							<h1>StuDream Timetable.</h1>
							<h4 className="mt-4 my-sub-text">
								Manage classwork, homework, projects,
								assignments every 7 days. Add all subjects,
								teachers, and timings.
							</h4>
						</div>
					</div>
				</div>

				<div className="row align-items-center">
					<div className="py-1 col-lg-6 order-lg-1">
						<div className="py-1 px-md-5">
							<h1>StuDream Achievements.</h1>
							<h4 className="mt-4 my-sub-text">
								Make note of wonderful achievements you have
								made, that won't be deleted from your memories.
							</h4>
						</div>
					</div>

					<div className="d-md-block col-lg-6 order-lg-2">
						<div className="p-2 d-flex justify-content-center">
							<img
								className="img-fluid "
								src={achievement_img}
								alt=""
							/>
						</div>
					</div>
				</div>

				<div className="row align-items-center">
					<div className="d-md-block col-lg-6 order-lg-1">
						<div className="p-2 d-flex justify-content-center">
							<img
								className="img-fluid "
								src={education_img}
								alt=""
							/>
						</div>
					</div>

					<div className="py-1 col-lg-6 order-lg-2">
						<div className="py-1 px-md-5">
							<h1>StuDream Education.</h1>
							<h4 className="mt-4 my-sub-text">
								Manage unit test, class test, and other
								examinations. Add marks and will automatically
								get a performance chart of exam.
							</h4>
						</div>
					</div>
				</div>

				<h3 className="mt-5 mx-2">Top Reviews</h3>

				<Review></Review>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default About;
