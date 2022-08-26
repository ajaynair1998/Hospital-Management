import { createSlice } from "@reduxjs/toolkit";

export const AppStateDataSlice = createSlice({
	name: "applicationData",
	initialState: {
		data: {
			location: "dashboard",
			category_name: "Dashboard",
		},
		newPatient: {
			stage: 0,
		},
	},
	reducers: {
		setSelectedApplicationStateCategory: (state: any, action: any) => {
			state.data = action.payload;
		},
		setNewPatientStage: (state: any, action: any) => {
			state.newPatient.stage = action.payload.stage;
		},
	},
});

export const { setSelectedApplicationStateCategory, setNewPatientStage } =
	AppStateDataSlice.actions;
export default AppStateDataSlice.reducer;
