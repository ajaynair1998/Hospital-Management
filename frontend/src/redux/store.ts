import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./reducers/userDataReducer";

export default configureStore({
	reducer: {
		userDataStore: userDataReducer,
	},
});
