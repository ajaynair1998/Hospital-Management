import {
	configureStore,
} from "@reduxjs/toolkit";
import userDataReducer from "./reducers/userDataReducer";
import categoriesDataReducer from "./reducers/categoriesDataReducer";
import favouritesDataReducer from "./reducers/favouritesDataReducer";
import patientTreatmentDetailsReducer from "./reducers/patientTreatmentDetailsReducer";
import utilDataReducer from "./reducers/utilDataReducer";
import appStateDataReducer from "./reducers/appStateDataReducer";
import logger from "redux-logger";
export default configureStore({
	reducer: {
		applicationDataStore: appStateDataReducer,
		categoriesStore: categoriesDataReducer,
		userDataStore: userDataReducer,
		favouritesDataStore: favouritesDataReducer,
		patientTreatmentDetailsDataStore: patientTreatmentDetailsReducer,
		utilDataStore: utilDataReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	// use the below one for loggin current state too
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false,
	// 	}).concat(logger),
});
