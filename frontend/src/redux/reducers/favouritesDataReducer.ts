import { createSlice } from "@reduxjs/toolkit";

export const favouritesDataSlice = createSlice({
	name: "favouritesData",
	initialState: {
		data: [],
	},
	reducers: {
		setFavourites: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setFavourites } = favouritesDataSlice.actions;
export default favouritesDataSlice.reducer;
