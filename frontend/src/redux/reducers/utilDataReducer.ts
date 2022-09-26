import { createSlice } from "@reduxjs/toolkit";

export const utilDataSlice = createSlice({
	name: "utilData",
	initialState: {
		data: {
			inputValue: "",
			snackBarOpen: false,
			snackBarText: "",
			inputDialogOpen: false,
			addNewPatientInputDialogOpen: false,
			addNewMedicineInputDialogOpen: false,
			addNewConsultationInputDialogOpen: false,
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
		setAddNewPatientInputDialogState: (state: any, action: any) => {
			state.data.addNewPatientInputDialogOpen =
				action.payload.addNewPatientInputDialogOpen;
		},
		setAddNewMedicineInputDialogState: (state: any, action: any) => {
			state.data.addNewMedicineInputDialogOpen =
				action.payload.addNewMedicineInputDialogOpen;
		},
		setAddNewConsultationInputDialogState: (state: any, action: any) => {
			state.data.addNewConsultationInputDialogOpen =
				action.payload.addNewConsultationInputDialogOpen;
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
} = utilDataSlice.actions;
export default utilDataSlice.reducer;
