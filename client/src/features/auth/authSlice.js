import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedInUser: null,
	token: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoggedInUser: (state, action) => {
			state.loggedInUser = action.payload;
		},
		storeTokenInLS: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", state.token);
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
			localStorage.setItem("token", null);
		},
	},
});

export const { setLoggedInUser, storeTokenInLS, logOut } = authSlice.actions;

export default authSlice.reducer;
