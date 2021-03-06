import React from "react";
import { Route } from "react-router-dom";
import Login from "../Login/Login";
import MyRoom from "../Room/MyRoom";

function MyWelcomeRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return localStorage.getItem("isUser") === "true" ? (
					<MyRoom></MyRoom>
				) : (
					<Login></Login>
				);
			}}
		></Route>
	);
}

export default MyWelcomeRoute;
