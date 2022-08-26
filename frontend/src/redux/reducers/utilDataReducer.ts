import { createSlice } from "@reduxjs/toolkit";

export const utilDataSlice = createSlice({
	name: "utilData",
	initialState: {
		data: {
			inputValue: "",
			snackBarOpen: false,
			snackBarText: "",
			inputDialogOpen: false,
			addNewPatientInputDialogOpen: true,
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
	},
});

export const {
	setSelectedInputValue,
	setSnackBarState,
	setInputDialogState,
	setAddNewPatientInputDialogState,
} = utilDataSlice.actions;
export default utilDataSlice.reducer;
