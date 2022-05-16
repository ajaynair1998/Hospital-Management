import { createSlice } from "@reduxjs/toolkit";

export const utilDataSlice = createSlice({
	name: "utilData",
	initialState: {
		data: {
			inputValue: "",
			snackBarOpen: false,
			snackBarText: "",
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
	},
});

export const { setSelectedInputValue, setSnackBarState } =
	utilDataSlice.actions;
export default utilDataSlice.reducer;
