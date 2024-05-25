import React from "react";
import ReactDOM from "react-dom/client";

// redux related
import { store } from "./app/store.js";
import { Provider } from "react-redux";

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

import DashboardHomePage from "./pages/InternalAdminPages/DashboardHomePage.jsx";
import DashboardNewRequest from "./pages/InternalAdminPages/DashboardNewRequest.jsx";

import DashboardMessages from "./pages/InternalAdminPages/DashboardMessages.jsx";
import DashboardSubscribersList from "./pages/InternalAdminPages/DashboardSubscribersList.jsx";

// Admin Dashboard Pages

import AdminDashboard from "./pages/AdminPages/AdminDashboard.jsx";
import AdminHomePage from "./pages/AdminPages/AdminHomePage.jsx";

import DashBoardTab from "./pages/AdminPages/DashBoardTab.jsx";
import StudentTab from "./pages/AdminPages/StudentTab.jsx";
import TeacherTab from "./pages/AdminPages/TeacherTab.jsx";
import CourseTab from "./pages/AdminPages/CourseTab.jsx";
import NoticeTab from "./pages/AdminPages/NoticeTab.jsx";
import DigitalLibraryTab from "./pages/AdminPages/DigitalLibraryTab.jsx";

import AddNewStudent from "./pages/AdminPages/AddNewStudent.jsx";
import AddNewTeacher from "./pages/AdminPages/AddNewTeacher.jsx";
import AddNewCourse from "./pages/AdminPages/AddNewCourse.jsx";

import StudentProfilePage from "./pages/AdminPages/StudentProfilePage.jsx";
import TeacherProfilePage from "./pages/AdminPages/TeacherProfilePage.jsx";
import AdminProfilePage from "./pages/AdminPages/AdminProfilePage.jsx";

import CourseBranches from "./pages/AdminPages/CourseBranches.jsx";

// Student Dashboard Pages

import StudentDashboard from "./pages/StudentPages/StudentDashboard.jsx";
import StudentHomePage from "./pages/StudentPages/StudentHomePage.jsx";

import StudentDashBoardTab from "./pages/StudentPages/StudentDashBoardTab.jsx";
import StudentAttendanceTab from "./pages/StudentPages/StudentAttendanceTab.jsx";
import StudentChatGroupsTab from "./pages/StudentPages/StudentChatGroupsTab.jsx";
import StudentDigitalLibraryTab from "./pages/StudentPages/StudentDigitalLibraryTab.jsx";
import StudentLiveClassTab from "./pages/StudentPages/StudentLiveClassTab.jsx";
import StudentSubjectsTab from "./pages/StudentPages/StudentSubjectsTab.jsx";

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
				<Route path="" element={<DashboardHomePage />} />
				<Route path="new-requests" element={<DashboardNewRequest />} />
				<Route path="subscribers-list" element={<DashboardSubscribersList />} />
				<Route path="messages" element={<DashboardMessages />} />
			</Route>

			{/* Admin Routes */}
			<Route path="/admin" element={<AdminDashboard />}>
				<Route path="" element={<AdminHomePage />} />
				<Route path="dashboard" element={<DashBoardTab />} />
				<Route path="students">
					<Route path="" element={<StudentTab />} />
					<Route path="add" element={<AddNewStudent />} />
					<Route path=":id" element={<StudentProfilePage />} />
				</Route>
				<Route path="teachers">
					<Route path="" element={<TeacherTab />} />
					<Route path="add" element={<AddNewTeacher />} />
					<Route path=":id" element={<TeacherProfilePage />} />
				</Route>
				<Route path="courses">
					<Route path="" element={<CourseTab />} />
					<Route path="add" element={<AddNewCourse />} />
					<Route path=":id" element={<CourseBranches />} />
				</Route>
				<Route path="notices" element={<NoticeTab />} />
				<Route path="digital-library" element={<DigitalLibraryTab />} />
				<Route path="profile" element={<AdminProfilePage />} />
			</Route>

			{/* Student Routes */}

			<Route path="/student" element={<StudentDashboard />}>
				<Route path="" element={<StudentHomePage />} />
				<Route path="dashboard" element={<StudentDashBoardTab />} />
				<Route path="live-classes" element={<StudentLiveClassTab />} />
				<Route path="chat-groups" element={<StudentChatGroupsTab />} />
				<Route path="attendance" element={<StudentAttendanceTab />} />
				<Route path="subjects" element={<StudentSubjectsTab />} />
				<Route path="digital-library" element={<StudentDigitalLibraryTab />} />
			</Route>
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<NextUIProvider>
			<RouterProvider router={router}></RouterProvider>
		</NextUIProvider>
	</Provider>
);
