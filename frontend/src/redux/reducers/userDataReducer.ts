import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
	name: "userData",
	initialState: {
		data: {},
	},
	reducers: {
		setSelectedUser: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setSelectedUser } = userDataSlice.actions;
export default userDataSlice.reducer;
