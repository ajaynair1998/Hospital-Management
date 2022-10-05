import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PatientTreatmentDetails from "./pages/PatientTreatmentDetails";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/patient-treatment-details"
					element={<PatientTreatmentDetails />}
				/>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
