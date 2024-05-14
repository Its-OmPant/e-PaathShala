import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")),
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoggedInUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		logOut: (state) => {
			state.user = null;
			localStorage.setItem("user", null);
		},
	},
});

export const { setLoggedInUser, logOut } = authSlice.actions;

export default authSlice.reducer;
