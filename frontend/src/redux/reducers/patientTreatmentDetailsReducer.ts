import { createSlice } from "@reduxjs/toolkit";

export const PatientTreatmentDetailsDataSlice = createSlice({
	name: "PatientTreatmentDetailsData",
	initialState: {
		treatment_detail_id: 1,
		chief_complaints: [],
	},
	reducers: {
		setChiefComplaints: (state, action) => {
			state.chief_complaints = action.payload;
		},
	},
});

export const { setChiefComplaints } = PatientTreatmentDetailsDataSlice.actions;
export default PatientTreatmentDetailsDataSlice.reducer;
