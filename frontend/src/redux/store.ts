import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./Reducers/userDataReducer";
import categoriesDataReducer from "./Reducers/categoriesDataReducer";
import favouritesDataReducer from "./Reducers/favouritesDataReducer";
import patientTreatmentDetailsReducer from "./Reducers/patientTreatmentDetailsReducer";

export default configureStore({
	reducer: {
		categoriesStore: categoriesDataReducer,
		userDataStore: userDataReducer,
		favouritesDataStore: favouritesDataReducer,
		patientTreatmentDetailsDataStore: patientTreatmentDetailsReducer,
	},
});
