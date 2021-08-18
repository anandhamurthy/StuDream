import React, { useState } from "react";

import icon from "../Img/icon.png";
import { Link } from "react-router-dom";

import { auth, db } from "../Firebase/firebase";

import "./Register.css";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState(null);

	if (localStorage.getItem("isUser") === "true") {
		window.location =
			"/my-room/" + JSON.parse(localStorage.getItem("user")).uid;
	}

	const onSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setError("Password and Confirm Password do not match");
			return;
		}
		const submitButton = document.querySelector(".register");

		submitButton.disabled = true;
		return await auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				if (user !== null) {
					db.collection("Users")
						.doc(user.uid)
						.set({
							name: name,
							user_id: user.uid,
							profile_image: "",
							email_id: email,
							room_id: user.uid,
							inspiration_images: [],
							quote: "All of us do not have equal talent. But, all of us have an equal opportunity to develop our talents. - APJ Abdul Kalam",
							brain_names: [
								"Brain 1",
								"Brain 2",
								"Brain 3",
								"Brain 4",
								"Brain 5",
								"Brain 6",
								"Brain 7",
							],
							isCupboard: false,
						})
						.then(() => {
							db.collection("User IDs")
								.doc(user.uid)
								.set({
									user_id: user.uid,
								})
								.then(() => {
									console.log(
										"Document successfully written!"
									);
									localStorage.setItem(
										"user",
										JSON.stringify(user)
									);
									localStorage.setItem("isUser", true);
									localStorage.setItem("userName", name);
									window.location = "/welcome/" + user.uid;
									submitButton.disabled = false;
								})
								.catch((error) => {
									console.error(
										"Error writing document: ",
										error
									);
									submitButton.disabled = false;
								});
						})
						.catch((error) => {
							console.error("Error writing document: ", error);
						});
				}
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
									<h1 className="text-dark">Register</h1>
									<p className="text-dark">
										Sign up to your account
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
											placeholder="Name"
											onChange={(event) =>
												setName(event.target.value)
											}
										/>
									</div>
									<div className="input-group mb-3">
										<span
											className="shadow rounded-left border-0 input-group-text bg-white"
											id="basic-addon1"
										>
											<i className="fas fa-at"></i>
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
											<i className="fas fa-lock"></i>
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
									<div className="input-group mb-4">
										<span
											className="shadow rounded-left border-0 input-group-text bg-white"
											id="basic-addon1"
										>
											<i className="fas fa-lock"></i>
										</span>
										<input
											type="password"
											className="shadow rounded-right border-0 form-control"
											placeholder="Confirm Password"
											onChange={(event) =>
												setConfirmPassword(
													event.target.value
												)
											}
										/>
									</div>
									<div>{error}</div>
									<div className="row">
										<div className="col-6">
											<button
												type="button"
												onClick={onSubmit}
												className="register shadow border-0 rounded-0 btn btn-primary px-4"
											>
												Register
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="shadow border-0 card text-white py-5 d-md-down-none">
								<div className="card-body">
									<div className="d-flex flex-column">
										<img
											src={icon}
											className="align-self-center"
											width="100px"
											alt=""
										/>
										<p className="mb-0 text-dark align-self-center text-center">
											<i>
												You are never too old to set
												another goal or to dream a new
												dream.
											</i>
										</p>
										<p className="text-dark align-self-end text-uppercase">
											<i>
												<b>- C.S. Lewis</b>
											</i>
										</p>
										<h4 className="align-self-center text-dark">
											Login
										</h4>
										<p className="align-self-center text-dark">
											Already have an account!
										</p>
										<Link
											to="/sign-in"
											className="login-float d-flex align-self-center"
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

export default Register;
