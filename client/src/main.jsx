import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./Layout.jsx";
import "./index.css";

// pages
import App from "./App.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Internal Admin Pages
import InternalAdminRegisterPage from "./pages/InternalAdminPages/InternalAdminRegisterPage.jsx";

import InternalAdminLoginPage from "./pages/InternalAdminPages/InternalAdminLoginPage.jsx";

import InternalAdminDashboard from "./pages/InternalAdminPages/InternalAdminDashboard.jsx";

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
			<Route path="" element={<App />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/contact" element={<ContactUsPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />

			{/* Internal Admin Routes */}
			<Route
				path="/internal/admin/register"
				element={<InternalAdminRegisterPage />}
			/>
			<Route
				path="/internal/admin/login"
				element={<InternalAdminLoginPage />}
			/>
			<Route
				path="/internal/admin/dashboard"
				element={<InternalAdminDashboard />}
			/>
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<NextUIProvider>
			<RouterProvider router={router}></RouterProvider>
		</NextUIProvider>
	</React.StrictMode>
);
