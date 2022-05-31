import { createSlice } from "@reduxjs/toolkit";

export const PatientTreatmentDetailsDataSlice = createSlice({
	name: "PatientTreatmentDetailsData",
	initialState: {
		treatment_detail_id: 1,
		chief_complaints: [],
		clinical_diagnosis: [],
	},
	reducers: {
		setChiefComplaints: (state: any, action: any) => {
			state.chief_complaints = action.payload;
		},
		setClinicalDiagnosis: (state: any, action: any) => {
			state.clinical_diagnosis = action.payload;
		},
	},
});

export const { setChiefComplaints, setClinicalDiagnosis } =
	PatientTreatmentDetailsDataSlice.actions;
export default PatientTreatmentDetailsDataSlice.reducer;