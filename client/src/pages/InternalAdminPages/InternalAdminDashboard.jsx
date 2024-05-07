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
		<div className="bg-slate-300 p-4 flex w-full min-h-screen max-h-screen gap-3">
			<Card className="w-1/5 p-3">
				<CardHeader>
					<div className="flex flex-col">
						<span className="font-extrabold tracking-wide text-lg text-blue-900 ">
							e-PaathShala
						</span>
						{/* <hr className="h-[3px] bg-slate-800 rounded w-full " /> */}
					</div>
				</CardHeader>
				<Divider className="h-1 rounded-md"></Divider>
				<CardBody className="px-0">
					<NavLink
						to=""
						className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-2 rounded-md flex items-center gap-3">
						<FaHome size={23} className="text-sky-800" />
						Home
					</NavLink>
					<NavLink
						to="new-requests"
						className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-2 rounded-md flex items-center gap-3">
						<IoPersonAddSharp size={23} className="text-sky-800" />
						New Requests
					</NavLink>
					<NavLink
						to="subscribers-list"
						className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-2 rounded-md flex items-center gap-3">
						<FaSchool size={23} className="text-sky-800" />
						Subscribers List
					</NavLink>
					<NavLink
						to="messages"
						className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-2 rounded-md flex items-center gap-3">
						<FaMessage size={23} className="text-sky-800" />
						Messages
					</NavLink>
				</CardBody>
				<Divider className="h-1 rounded-md"></Divider>
				<CardFooter className="flex-col">
					<div className="my-2 rounded-md flex gap-4 w-full items-center">
						<Avatar size="sm" className="bg-gray-200"></Avatar>
						<NavLink>Profile</NavLink>
					</div>
					<div className="  py-2 my-2 rounded-md flex gap-4 w-full items-center">
						<NavLink className="flex items-center gap-3 text-red-600">
							<MdLogout size={24} /> Logout
						</NavLink>
					</div>
				</CardFooter>
			</Card>

			{/* Right */}
			<Outlet />
		</div>
	);
}

export default InternalAdminDashboard;
