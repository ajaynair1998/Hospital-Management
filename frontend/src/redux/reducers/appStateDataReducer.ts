import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { countries } from "../../components/CountrySelect";

export const AppStateDataSlice = createSlice({
	name: "applicationData",
	initialState: {
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
		editPatient: {
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
		newMedicine: {
			name: "",
			strength: "",
			medicine_form: "",
			description: "",
		},
		medicines: [],
		selectedPatient: {
			selected: false,
			patientProfileDetails: {},
			patientConsultationDetails: {},
		},
		selectedPatientConsultation: {
			id: 1,
			multiple: false,
			patientId: 1,
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
		setEditPatientDataField: (state: any, action: any) => {
			state.editPatient[action.payload.key] = action.payload.value;
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
			state.selectedPatient.selected = true;
			state.selectedPatient.patientProfileDetails =
				action.payload.patientProfileDetails;
		},

		setSelectedPatientConsultationDetails: (state: any, action: any) => {
			state.selectedPatient.selected = true;
			state.selectedPatient.patientConsultationDetails =
				action.payload.patientConsultationDetails;
		},
		resetSelectedPatientDataFields: (state: any, action: any) => {
			state.selectedPatient = {
				selected: false,
				patientProfileDetails: {},
				patientConsultationDetails: {},
			};
		},
		resetEditPatientDataFields: (state: any, action: any) => {
			state.editPatient = {
				stage: 0,
			};
		},
		migrateSelectedPatientToEditPatient: (state: any, action: any) => {
			state.editPatient = {
				stage: 0,
				...state.selectedPatient.patientProfileDetails,
				date_of_birth: moment(
					state.selectedPatient.patientProfileDetails.date_of_birth
				).toDate(),
				nationality: state.selectedPatient.patientProfileDetails.nationality
					? JSON.parse(state.selectedPatient.patientProfileDetails.nationality)
					: countries[0],
			};
		},
		setEditPatientStage: (state: any, action: any) => {
			state.editPatient.stage = action.payload.stage;
		},

		setSelectedPatientConsultation: (state: any, action: any) => {
			state.selectedPatientConsultation = {
				id: action.payload.id,
				multiple: action.payload.multiple,
				patientId: action.payload.patientId,
			};
		},
		setNewMedicineDataField: (state: any, action: any) => {
			state.newMedicine[action.payload.key] = action.payload.value;
		},
		resetNewMedicineDataFields: (state: any, action: any) => {
			state.newMedicine = {
				name: "",
				strength: "",
				medicine_form: "",
				description: "",
			};
		},
		setMedicines: (state: any, action: any) => {
			state.medicines = action.payload.medicines;
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
	setSelectedPatientConsultation,
	setNewMedicineDataField,
	resetNewMedicineDataFields,
	setMedicines,
	migrateSelectedPatientToEditPatient,
	resetEditPatientDataFields,
	setEditPatientStage,
	setEditPatientDataField,
} = AppStateDataSlice.actions;
export default AppStateDataSlice.reducer;
