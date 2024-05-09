import React from "react";
import { NavLink, Outlet } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/react";

// icons
import { MdLogout } from "react-icons/md";
import { FaHome, FaSchool } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";

function InternalAdminDashboard() {
	return (
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
					<NavLink className="flex items-center gap-3 text-red-600">
						<MdLogout size={24} /> Logout
					</NavLink>
				</CardFooter>
			</Card>

			{/* Right */}
			<Outlet />
		</div>
	);
}

export default InternalAdminDashboard;
