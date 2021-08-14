import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import main_img_1 from "../Img/main_img_1.png";
import "./About.css";

function About() {
	return (
		<div>
			<Navbar></Navbar>
			<div className="container-fluid center-y my-bg">
				<div class="row align-items-center ">
					<div class="py-1 col-lg-6 order-lg-1 mt-5 mt-lg-0">
						<div class="py-1 px-md-5 mt-5 mt-lg-0">
							<h1>StuDream helps teams move work forward.</h1>
							<h4 className="mt-4 my-sub-text">
								Collaborate, manage projects, and reach new
								productivity peaks. From high rises to the home
								office, the way your team works is
								unique—accomplish it all with StuDream.
							</h4>
						</div>
					</div>

					<div class="d-md-block col-lg-6 order-lg-2">
						<div class="p-2 d-flex justify-content-center">
							<img class="img-fluid " src={main_img_1} alt="" />
						</div>
					</div>
				</div>

				<div>
					<div class="p-2 d-flex flex-column justify-content-center">
						<h1 className="text-center">
							It’s more than work. It’s a way of working together.
						</h1>
						<h4 className="mt-4 text-center my-sub-text">
							Start with a StuDream board, lists, and cards.
							Customize and expand with more features as your
							teamwork grows. Manage projects, organize tasks, and
							build team spirit—all in one place.
						</h4>
					</div>
				</div>

				<div>
					<div class="d-md-block col-lg-12 order-lg-2">
						<div class="p-2 d-flex justify-content-center">
							<img
								class="img-fluid"
								src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png"
								alt=""
							/>
						</div>
					</div>
				</div>

				<div class="row align-items-center">
					<div class="py-1 col-lg-6 order-lg-1">
						<div class="py-1 px-md-5">
							<h1>StuDream helps teams move work forward.</h1>
							<h4 className="mt-4 my-sub-text">
								Collaborate, manage projects, and reach new
								productivity peaks. From high rises to the home
								office, the way your team works is
								unique—accomplish it all with StuDream.
							</h4>
						</div>
					</div>

					<div class="d-md-block col-lg-6 order-lg-2">
						<div class="p-2 d-flex justify-content-center">
							<img
								class="img-fluid "
								src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/5f90e4a913ac52092f2ac7ff308c45c4/view.svg"
								alt=""
							/>
						</div>
					</div>
				</div>

				<div class="row align-items-center">
					<div class="d-md-block col-lg-6 order-lg-1">
						<div class="p-2 d-flex justify-content-center">
							<img
								class="img-fluid "
								src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/b845022d8d738ba8fa5e8b293e434149/card-back.svg"
								alt=""
							/>
						</div>
					</div>

					<div class="py-1 col-lg-6 order-lg-2">
						<div class="py-1 px-md-5">
							<h1>StuDream helps teams move work forward.</h1>
							<h4 className="mt-4 my-sub-text">
								Collaborate, manage projects, and reach new
								productivity peaks. From high rises to the home
								office, the way your team works is
								unique—accomplish it all with StuDream.
							</h4>
						</div>
					</div>
				</div>

				<div class="row align-items-center">
					<div class="py-1 col-lg-6 order-lg-1">
						<div class="py-1 px-md-5">
							<h1>StuDream helps teams move work forward.</h1>
							<h4 className="mt-4 my-sub-text">
								Collaborate, manage projects, and reach new
								productivity peaks. From high rises to the home
								office, the way your team works is
								unique—accomplish it all with StuDream.
							</h4>
						</div>
					</div>

					<div class="d-md-block col-lg-6 order-lg-2">
						<div class="p-2 d-flex justify-content-center">
							<img
								class="img-fluid "
								src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/features/35366a300daac434fa02bc3ef83d8132/automation.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default About;
