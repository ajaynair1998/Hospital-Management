import { createSlice } from "@reduxjs/toolkit";

export const utilDataSlice = createSlice({
	name: "utilData",
	initialState: {
		data: {
			inputValue: "",
		},
	},
	reducers: {
		setSelectedInputValue: (state, action) => {
			state.data.inputValue = action.payload;
		},
	},
});

export const { setSelectedInputValue } = utilDataSlice.actions;
export default utilDataSlice.reducer;
