import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./reducers/userDataReducer";
import categoriesDataReducer from "./reducers/categoriesDataReducer";
import favouritesDataReducer from "./reducers/favouritesDataReducer";

export default configureStore({
	reducer: {
		categoriesStore: categoriesDataReducer,
		userDataStore: userDataReducer,
		favouritesDataStore: favouritesDataReducer,
	},
});
