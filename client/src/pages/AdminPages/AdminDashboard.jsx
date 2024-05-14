import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import NotFoundPage from "../NotFoundPage.jsx";

// redux related
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

// icons
import { MdLogout } from "react-icons/md";
import { FaHome, FaSchool } from "react-icons/fa";
import { toast } from "react-toastify";

function AdminDashboard() {
	const toastOptions = {
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);

	const logoutSession = (e) => {
		dispatch(logOut());
		toast.success("Logged out successfully", toastOptions);
		navigate("/");
	};

	let content;

	if (user) {
		content = (
			<div className="bg-sky-300 p-4 flex w-full min-h-screen max-h-screen gap-3">
				<Card className="w-1/5 p-3">
					<CardHeader>
						<div className="flex flex-col">
							<span className="font-extrabold tracking-wide text-lg text-blue-900 ">
								e-PaathShala
							</span>
						</div>
					</CardHeader>
					<Divider className="h-1 rounded-md"></Divider>
					<CardBody className="px-0">
						<NavLink
							to=""
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Home
						</NavLink>
						<NavLink
							to="dashboard"
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Dashboard
						</NavLink>

						<NavLink
							to=""
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Students
						</NavLink>

						<NavLink
							to=""
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Teachers
						</NavLink>

						<NavLink
							to=""
							className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Courses
						</NavLink>

						<NavLink
							to=""
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaHome size={21} className="text-sky-800" />
							Notices
						</NavLink>
					</CardBody>

					<Divider className="h-1 rounded-md"></Divider>
					<CardFooter>
						<NavLink
							onClick={logoutSession}
							className="flex items-center gap-3 text-red-600">
							<MdLogout size={24} /> Logout
						</NavLink>
					</CardFooter>
				</Card>

				{/* Right */}
				<Outlet />
			</div>
		);
	} else {
		content = <NotFoundPage />;
	}

	return content;
}

export default AdminDashboard;
