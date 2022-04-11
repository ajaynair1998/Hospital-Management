import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./reducers/userDataReducer";
import categoriesDataReducer from "./reducers/categoriesDataReducer";

export default configureStore({
	reducer: {
		categoriesStore: categoriesDataReducer,
		userDataStore: userDataReducer,
	},
});
