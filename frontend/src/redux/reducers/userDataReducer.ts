import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
	name: "userData",
	initialState: {
		data: {},
	},
	reducers: {
		setSelectedUser: (state: any, action: any) => {
			state.data = action.payload;
		},
	},
});

export const { setSelectedUser } = userDataSlice.actions;
export default userDataSlice.reducer;
