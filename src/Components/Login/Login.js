import React, { useState } from "react";

import { Link } from "react-router-dom";

import icon from "../Img/icon.png";

import { auth } from "../Firebase/firebase";

import "./Login.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	if (localStorage.getItem("isUser") === "true") {
		window.location =
			"/my-room/" + JSON.parse(localStorage.getItem("user")).uid;
	}

	const onSubmit = async (event) => {
		event.preventDefault();
		const submitButton = document.querySelector(".login");

		submitButton.disabled = true;
		return await auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("isUser", true);
				console.log(user.uid);
				window.location = "/welcome/" + user.uid;
				submitButton.disabled = false;
			})
			.catch((error) => {
				setError(error.message);
				submitButton.disabled = false;
			});
	};

	return (
		<div id="register_bg">
			<div className="my-5 container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card-group mb-0">
							<div className="shadow border-0 card p-4">
								<div className="card-body">
									<h1 className="text-dark">Login</h1>
									<p className="text-dark">
										Sign In to your account
									</p>
									<div className="input-group mb-3">
										<span
											className="shadow rounded-left border-0 input-group-text bg-white"
											id="basic-addon1"
										>
											<i className="fa fa-user"></i>
										</span>
										<input
											type="text"
											className="shadow rounded-right border-0 form-control"
											placeholder="Email ID"
											onChange={(event) =>
												setEmail(event.target.value)
											}
										/>
									</div>
									<div className="input-group mb-3">
										<span
											className="shadow rounded-left border-0 input-group-text bg-white"
											id="basic-addon1"
										>
											<i className="fa fa-lock"></i>
										</span>
										<input
											type="password"
											className="shadow rounded-right border-0 form-control"
											placeholder="Password"
											onChange={(event) =>
												setPassword(event.target.value)
											}
										/>
									</div>
									<div>{error}</div>
									<div className="row">
										<div className="col-6">
											<button
												type="button"
												onClick={onSubmit}
												className="login shadow border-0 rounded-0 btn btn-primary px-4"
											>
												Login
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="shadow border-0 card text-white py-5 d-md-down-none">
								<div className="card-body text-center">
									<div
										className="
                d-flex
                flex-column
                align-self-center
                justify-content-center
              "
									>
										<img
											className="align-self-center"
											src={icon}
											width="100px"
											alt=""
										/>
										<p className="mb-0 text-dark align-self-center text-center">
											<i>
												What is not started today is
												never finished tomorrow.
											</i>
										</p>
										<p className="mb-0 text-dark align-self-end text-uppercase">
											<i>
												<b>
													- Johann Wolfgang von Goethe
												</b>
											</i>
										</p>
										<h4 className="align-self-center text-dark">
											Create a new account!
										</h4>
										<p className="align-self-center text-dark">
											No Account yet!
										</p>

										<Link
											to="/sign-up"
											className="login-float d-flex align-self-center align-items-center"
										>
											<i className="m-auto fas fa-arrow-right"></i>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
