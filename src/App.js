import "./App.css";
import About from "./Components/Main/About";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import FrontSide from "./Components/FrontSide/FrontSide";

import MyLoginRoute from "./Components/Contexts/MyLoginRoute";
import Room from "./Components/Room/MyRoom";
import MyWelcomeRoute from "./Components/Contexts/MyWelcomeRoute";
import Todo from "./Components/Todo/Todo";
import MyRegisterRoute from "./Components/Contexts/MyRegisterRoute";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/welcome/:id" component={FrontSide} />
				<MyWelcomeRoute exact path="/my-room/:id" component={Room} />
				<Route exact path="/" component={About} />
				<Route exact path="/my-todo" component={Todo} />
				<MyLoginRoute exact path="/sign-in" component={Login} />
				<MyRegisterRoute exact path="/sign-up" component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
