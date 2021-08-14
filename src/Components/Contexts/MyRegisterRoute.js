import React from "react";
import { Route, Redirect } from "react-router-dom";
import Register from "../Register/Register";

function MyRegisterRoute({ component: Component, ...rest }) {
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
					<Register></Register>
				);
			}}
		></Route>
	);
}

export default MyRegisterRoute;
