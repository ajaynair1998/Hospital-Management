import { createSlice } from "@reduxjs/toolkit";

export const AppStateDataSlice = createSlice({
	name: "applicationData",
	initialState: {
		data: {
			location: "dashboard",
			category_name: "Dashboard",
		},
	},
	reducers: {
		setSelectedApplicationStateCategory: (state: any, action: any) => {
			state.data = action.payload;
		},
	},
});

export const { setSelectedApplicationStateCategory } =
	AppStateDataSlice.actions;
export default AppStateDataSlice.reducer;
