import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../Login/Login";

function MyLoginRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={() => {
				return localStorage.getItem("isUser") === "true" ? (
					<Redirect
						to={
							"/welcome/" +
							JSON.parse(localStorage.getItem("user")).uid
						}
					/>
				) : (
					<Login></Login>
				);
			}}
		></Route>
	);
}

export default MyLoginRoute;
