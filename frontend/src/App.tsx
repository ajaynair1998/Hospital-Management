import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import ReduxTest from "./pages/ReduxTest";
import "./App.css";
import PatientTreatmentDetails from "./pages/PatientTreatmentDetails";

function App() {
	return (
		<div className="App">
			<Routes>
				{/* <Route path="/" element={<Test />} /> */}
				<Route path="/redux-test" element={<ReduxTest />} />
				<Route path="/" element={<PatientTreatmentDetails />} />
			</Routes>
			{/* <h1>Welcome to React Router!</h1> */}
		</div>
	);
}

export default App;
