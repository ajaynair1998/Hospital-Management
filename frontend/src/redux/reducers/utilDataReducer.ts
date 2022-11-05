import { createSlice } from "@reduxjs/toolkit";

export const utilDataSlice = createSlice({
	name: "utilData",
	initialState: {
		data: {
			inputValue: "",
			snackBarOpen: false,
			snackBarText: "",
			inputDialogOpen: false,
			summaryDialogOpen: false,
			addNewPatientInputDialogOpen: false,
			editPatientInputDialogOpen: false,
			addNewMedicineInputDialogOpen: false,
			addNewConsultationInputDialogOpen: false,
			deletePatientConfirmationDialogOpen: false,
		},
	},
	reducers: {
		setSelectedInputValue: (state: any, action: any) => {
			state.data.inputValue = action.payload;
		},
		setSnackBarState: (state: any, action: any) => {
			state.data.snackBarOpen = action.payload.snackBarOpen;
			state.data.snackBarText = action.payload.text;
		},
		setInputDialogState: (state: any, action: any) => {
			state.data.inputDialogOpen = action.payload.inputDialogOpen;
		},
		setSummaryDialogState: (state: any, action: any) => {
			state.data.summaryDialogOpen = action.payload;
		},
		setAddNewPatientInputDialogState: (state: any, action: any) => {
			state.data.addNewPatientInputDialogOpen =
				action.payload.addNewPatientInputDialogOpen;
		},
		setEditPatientInputDialogState: (state: any, action: any) => {
			state.data.editPatientInputDialogOpen = action.payload;
		},
		setAddNewMedicineInputDialogState: (state: any, action: any) => {
			state.data.addNewMedicineInputDialogOpen =
				action.payload.addNewMedicineInputDialogOpen;
		},
		setAddNewConsultationInputDialogState: (state: any, action: any) => {
			state.data.addNewConsultationInputDialogOpen =
				action.payload.addNewConsultationInputDialogOpen;
		},
		setDeletePatientConfirmationState: (state: any, action: any) => {
			state.data.deletePatientConfirmationDialogOpen = action.payload;
		},
		setAddNewPatientMode: (state: any, action: any) => {
			state.data.addNewPatientMode = action.payload;
		},
	},
});

export const {
	setSelectedInputValue,
	setSnackBarState,
	setInputDialogState,
	setAddNewPatientInputDialogState,
	setAddNewMedicineInputDialogState,
	setAddNewConsultationInputDialogState,
	setSummaryDialogState,
	setAddNewPatientMode,
	setDeletePatientConfirmationState,
	setEditPatientInputDialogState,
} = utilDataSlice.actions;
export default utilDataSlice.reducer;
