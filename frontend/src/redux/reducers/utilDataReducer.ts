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
	},
});

export const {
	setSelectedInputValue,
	setSnackBarState,
	setInputDialogState,
	setAddNewPatientInputDialogState,
	setAddNewMedicineInputDialogState,
} = utilDataSlice.actions;
export default utilDataSlice.reducer;
