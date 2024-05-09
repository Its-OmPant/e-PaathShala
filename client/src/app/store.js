import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "../features/auth/authSlice.js";

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
