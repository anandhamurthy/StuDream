import React, { useState, useEffect } from "react";
import "./Navbar.css";
import icon from "../Img/icon.png";
function Navbar() {
	const [navBar, setNavbar] = useState(false);

	function getLogin() {
		window.location = "sign-in";
	}

	function getRegister() {
		window.location = "sign-up";
	}

	const changeBG = () => {
		if (window.scrollY >= 60) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	window.addEventListener("scroll", changeBG);

	return (
		<div>
			<nav
				className={
					navBar
						? "navbar my-navbar active fixed-top navbar-expand-lg navbar-light shadow-sm p-1 mb-5"
						: "navbar my-navbar fixed-top navbar-expand-lg navbar-light p-1 mb-5"
				}
			>
				<div className="container-fluid">
					<div className="d-flex flex-row align-items-center ">
						<img
							className="align-self-center mb-1"
							src={icon}
							alt=""
							width="50px"
						/>
						<a className="my-link align-self-center" href="#">
							<h4 className="my-title">StuDream</h4>
						</a>
					</div>

					<div className="d-flex ">
						<button
							onClick={getRegister}
							className="btn btn-primary btn-sm mx-2"
						>
							Sign Up
						</button>
						<button
							onClick={getLogin}
							className="btn btn-primary btn-sm mx-2"
						>
							Sign In
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
