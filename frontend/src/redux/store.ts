import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./Reducers/userDataReducer";
import categoriesDataReducer from "./Reducers/categoriesDataReducer";
import favouritesDataReducer from "./Reducers/favouritesDataReducer";
import patientTreatmentDetailsReducer from "./Reducers/patientTreatmentDetailsReducer";
import utilDataReducer from "./Reducers/utilDataReducer";
import appStateDataReducer from "./Reducers/appStateDataReducer";

export default configureStore({
	reducer: {
		applicationDataStore: appStateDataReducer,
		categoriesStore: categoriesDataReducer,
		userDataStore: userDataReducer,
		favouritesDataStore: favouritesDataReducer,
		patientTreatmentDetailsDataStore: patientTreatmentDetailsReducer,
		utilDataStore: utilDataReducer,
	},
});
