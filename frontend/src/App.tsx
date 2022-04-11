import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/test";
import ReduxTest from "./pages/redux-test";
import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Welcome to React Router!</h1>
			<Routes>
				<Route path="/" element={<Test />} />
				<Route path="/redux-test" element={<ReduxTest />} />
			</Routes>
		</div>
	);
}

export default App;
