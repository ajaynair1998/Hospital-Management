import { createSlice } from "@reduxjs/toolkit";
import { countries } from "../../components/CountrySelect";

export const AppStateDataSlice = createSlice({
	name: "applicationData",
	initialState: {
		patientSelected: false,
		data: {
			location: "dashboard",
			category_name: "Dashboard",
		},
		newPatient: {
			stage: 0,
			name: "",
			gender: "not_selected",
			date_of_birth: new Date(),
			nationality: countries[0],
			phone_number: "",
			address: "",
			marital_status: "not_selected",
			blood_group: "not_selected",
			mobile_number: "",
			occupation: "",
			referred_by: "",
			email: "",
		},
		selectedPatient: {
			patientProfileDetails: {},
			patientConsultationDetails: {},
		},
	},
	reducers: {
		setSelectedApplicationStateCategory: (state: any, action: any) => {
			state.data = action.payload;
		},
		setNewPatientStage: (state: any, action: any) => {
			state.newPatient.stage = action.payload.stage;
		},
		setNewPatientDataField: (state: any, action: any) => {
			state.newPatient[action.payload.key] = action.payload.value;
		},
		resestPatientDataFields: (state: any, action: any) => {
			state.newPatient = {
				stage: 0,
				name: "",
				gender: "not_selected",
				date_of_birth: new Date(),
				nationality: countries[0],
				phone_number: "",
				address: "",
				marital_status: "not_selected",
				blood_group: "not_selected",
				mobile_number: "",
				occupation: "",
				referred_by: "",
				email: "",
			};
		},
		setSelectedPatientProfileDetails: (state: any, action: any) => {
			state.selectedPatient.patientProfileDetails =
				action.payload.patientProfileDetails;
		},

		setSelectedPatientConsultationDetails: (state: any, action: any) => {
			state.selectedPatient.patientConsultationDetails =
				action.payload.patientConsultationDetails;
		},
		resetSelectedPatientDataFields: (state: any, action: any) => {
			state.patientSelected = false;
			state.selectedPatient = {
				patientProfileDetails: {},
				patientConsultationDetails: {},
			};
		},
	},
});

export const {
	setSelectedApplicationStateCategory,
	setNewPatientStage,
	setNewPatientDataField,
	resestPatientDataFields,
	setSelectedPatientProfileDetails,
	setSelectedPatientConsultationDetails,
	resetSelectedPatientDataFields,
} = AppStateDataSlice.actions;
export default AppStateDataSlice.reducer;
