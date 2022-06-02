import { createSlice } from "@reduxjs/toolkit";

export const PatientTreatmentDetailsDataSlice = createSlice({
	name: "PatientTreatmentDetailsData",
	initialState: {
		treatment_detail_id: 1,
		chief_complaints: [],
		clinical_diagnosis: [],
		past_medical_history: [],
		past_surgical_history: [],
	},
	reducers: {
		setChiefComplaints: (state: any, action: any) => {
			state.chief_complaints = action.payload;
		},
		setClinicalDiagnosis: (state: any, action: any) => {
			state.clinical_diagnosis = action.payload;
		},
		setPastMedicalHistory: (state: any, action: any) => {
			state.past_medical_history = action.payload;
		},
		setPastSurgicalHistory: (state: any, action: any) => {
			state.past_surgical_history = action.payload;
		},
	},
});

export const {
	setChiefComplaints,
	setClinicalDiagnosis,
	setPastMedicalHistory,
	setPastSurgicalHistory,
} = PatientTreatmentDetailsDataSlice.actions;
export default PatientTreatmentDetailsDataSlice.reducer;
