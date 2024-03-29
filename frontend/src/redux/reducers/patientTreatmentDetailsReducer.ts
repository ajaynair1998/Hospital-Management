import { createSlice } from "@reduxjs/toolkit";

export const PatientTreatmentDetailsDataSlice = createSlice({
	name: "PatientTreatmentDetailsData",
	initialState: {
		treatment_detail_id: 1,
		chief_complaints: [],
		clinical_diagnosis: [],
		past_medical_history: [],
		past_surgical_history: [],
		general_examination: [],
		treatment_plan: [],
		local_examination: [],
		diagnosis: [],
		history_of_complaints: [],
		drug_allergies: [],
		follow_ups: [],
		investigation: [],
		treatment_done: [],
		prescription: [],
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
		setGeneralExamination: (state: any, action: any) => {
			state.general_examination = action.payload;
		},
		setTreatmentPlan: (state: any, action: any) => {
			state.treatment_plan = action.payload;
		},
		setLocalExamination: (state: any, action: any) => {
			state.local_examination = action.payload;
		},
		setDiagnosis: (state: any, action: any) => {
			state.diagnosis = action.payload;
		},
		setHistoryOfComplaints: (state: any, action: any) => {
			state.history_of_complaints = action.payload;
		},
		setDrugAllergies: (state: any, action: any) => {
			state.drug_allergies = action.payload;
		},
		setFollowUps: (state: any, action: any) => {
			state.follow_ups = action.payload;
		},
		setInvestigation: (state: any, action: any) => {
			state.investigation = action.payload;
		},
		setTreatmentDone: (state: any, action: any) => {
			state.treatment_done = action.payload;
		},
		setPrescription: (state: any, action: any) => {
			state.prescription = action.payload;
		},
		resetAllDataInPatientTreatmentDetails: (state: any, action: any) => {
			state.treatment_detail_id = 1;
			state.chief_complaints = [];
			state.clinical_diagnosis = [];
			state.past_medical_history = [];
			state.past_surgical_history = [];
			state.general_examination = [];
			state.treatment_plan = [];
			state.local_examination = [];
			state.diagnosis = [];
			state.history_of_complaints = [];
			state.drug_allergies = [];
			state.follow_ups = [];
			state.investigation = [];
			state.treatment_done = [];
			state.prescription = [];
		},
	},
});

export const {
	setChiefComplaints,
	setClinicalDiagnosis,
	setPastMedicalHistory,
	setPastSurgicalHistory,
	setGeneralExamination,
	setTreatmentPlan,
	setLocalExamination,
	setDiagnosis,
	setHistoryOfComplaints,
	setDrugAllergies,
	setFollowUps,
	setInvestigation,
	setTreatmentDone,
	setPrescription,
	resetAllDataInPatientTreatmentDetails,
} = PatientTreatmentDetailsDataSlice.actions;
export default PatientTreatmentDetailsDataSlice.reducer;
