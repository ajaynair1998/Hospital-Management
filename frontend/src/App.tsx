import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import ReduxTest from "./pages/ReduxTest";
import "./App.css";
import PatientTreatmentDetails from "./pages/PatientTreatmentDetails";
import Patients from "./pages/Patients";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/redux-test" element={<ReduxTest />} />
				<Route
					path="/patient-treatment-details"
					element={<PatientTreatmentDetails />}
				/>
				<Route path="/" element={<Patients />} />
			</Routes>
		</div>
	);
}

export default App;
