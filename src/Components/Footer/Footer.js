import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<div>
			<footer className="page-footer font-small">
				<div className="container">
					<div className="row text-center d-flex justify-content-center pt-5 mb-3">
						<div className="col-md-2 mb-3">
							<h6 className="text-uppercase font-weight-bold">
								<p>Developer's View</p>
							</h6>
						</div>

						<hr className="rgba-white-light"></hr>

						<div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
							<div className="col-md-8 col-12 mt-5">
								<p>
									This is a Student Operating System, which is
									done to make students' workflow easier,
									interesting, and comfortable. This makes
									student's activities to the professionals.
									An AM Project who have dreamt to create
									StuDream since, 2000.
								</p>
							</div>
						</div>

						<hr className="clearfix d-md-none rgba-white-light"></hr>

						<div className="row pb-3">
							{/* <div className="col-md-12">
								<div className="mb-5 flex-center">
									<a className="fb-ic m-5">
										<i className="fab fa-facebook-f fa-lg white-text mr-4">
											{" "}
										</i>
									</a>
									<a className="tw-ic m-5">
										<i className="fab fa-twitter fa-lg white-text mr-4">
											{" "}
										</i>
									</a>
									<a className="gplus-ic m-5">
										<i className="fab fa-google-plus-g fa-lg white-text mr-4">
											{" "}
										</i>
									</a>
									<a className="li-ic m-5">
										<i className="fab fa-linkedin-in fa-lg white-text mr-4">
											{" "}
										</i>
									</a>
									<a className="ins-ic m-5">
										<i className="fab fa-instagram fa-lg white-text mr-4">
											{" "}
										</i>
									</a>
									<a className="pin-ic m-5">
										<i className="fab fa-pinterest fa-lg white-text">
											{" "}
										</i>
									</a>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				<div className="footer-copyright text-center py-3">
					© 2021 Copyright {"  "}
					<a href="https://studream.com/" className="my-link">
						StuDream.com
					</a>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
