import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "../Home";
import Login from "../Login";
import Medicines from "../Medicines";
import CreatePrescription from "../Prescription/create";
import ShowPrescription from "../Prescription/show";
import Prescriptions from "../Prescription";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
function Layout() {
	function ScrollToTop() {
		const { pathname } = useLocation();
		useEffect(() => {
			window.scrollTo(0, 0);
		}, [pathname]);
		return null;
	}

	return (
		<>
			<Router basename={process.env.PUBLIC_URL}>
				<ScrollToTop />
				<Header />
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/medicines">
						<Medicines />
					</Route>
					<Route path="/prescriptions">
						<Prescriptions />
					</Route>
					<Route path="/prescription/create">
						<CreatePrescription />
					</Route>
					<Route path="/prescription/show">
						<ShowPrescription />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default Layout;
