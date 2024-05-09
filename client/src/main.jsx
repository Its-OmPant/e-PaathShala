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
import GetStartedPage from "./pages/GetStartedPage.jsx";

// Internal Admin Pages
import InternalAdminRegisterPage from "./pages/InternalAdminPages/InternalAdminRegisterPage.jsx";

import InternalAdminLoginPage from "./pages/InternalAdminPages/InternalAdminLoginPage.jsx";

import InternalAdminDashboard from "./pages/InternalAdminPages/InternalAdminDashboard.jsx";

import DashboardMain from "./pages/InternalAdminPages/DashboardMain.jsx";
import DashboardNewRequest from "./pages/InternalAdminPages/DashboardNewRequest.jsx";

import DashboardMessages from "./pages/InternalAdminPages/DashboardMessages.jsx";
import DashboardSubscribersList from "./pages/InternalAdminPages/DashboardSubscribersList.jsx";

// Admin Dashboard Pages

import AdminDashboard from "./pages/AdminPages/AdminDashboard.jsx";
import AdminHomePage from "./pages/AdminPages/AdminHomePage.jsx";

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
			<Route path="/get-started" element={<GetStartedPage />} />

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
				path="/internal/admin/dashboard/"
				element={<InternalAdminDashboard />}>
				<Route path="" element={<DashboardMain />} />
				<Route path="new-requests" element={<DashboardNewRequest />} />
				<Route path="subscribers-list" element={<DashboardSubscribersList />} />
				<Route path="messages" element={<DashboardMessages />} />
			</Route>

			{/* Admin Routes */}
			<Route path="/admin" element={<AdminDashboard />}>
				<Route path="" element={<AdminHomePage />} />
			</Route>
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<NextUIProvider>
		<RouterProvider router={router}></RouterProvider>
	</NextUIProvider>
);
