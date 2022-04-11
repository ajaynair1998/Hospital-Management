import { createSlice } from "@reduxjs/toolkit";

export const CategoriesDataSlice = createSlice({
	name: "categories",
	initialState: {
		data: {
			location: "chief_complaint",
			category_name: "Chief Complaint",
		},
	},
	reducers: {
		setSelectedCategory: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setSelectedCategory } = CategoriesDataSlice.actions;
export default CategoriesDataSlice.reducer;
