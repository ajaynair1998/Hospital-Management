import {
	configureStore,
	createSerializableStateInvariantMiddleware,
	getDefaultMiddleware,
	isPlain,
} from "@reduxjs/toolkit";
import userDataReducer from "./Reducers/userDataReducer";
import categoriesDataReducer from "./Reducers/categoriesDataReducer";
import favouritesDataReducer from "./Reducers/favouritesDataReducer";
import patientTreatmentDetailsReducer from "./Reducers/patientTreatmentDetailsReducer";
import utilDataReducer from "./Reducers/utilDataReducer";
import appStateDataReducer from "./Reducers/appStateDataReducer";
import logger from "redux-logger";
let serializableCheck = createSerializableStateInvariantMiddleware({
	isSerializable: (value: any) => true,
});

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
		}).concat(logger),
});
