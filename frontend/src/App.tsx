import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/test";
import ReduxTest from "./pages/redux-test";
import "./App.css";
import Drawer from "./components/drawer";

function App() {
	return (
		<div className="App">
			<Routes>
				{/* <Route path="/" element={<Test />} /> */}
				<Route path="/redux-test" element={<ReduxTest />} />
				<Route path="/" element={<Drawer />} />
			</Routes>
			{/* <h1>Welcome to React Router!</h1> */}
		</div>
	);
}

export default App;
