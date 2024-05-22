import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// redux related
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice.js";

import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Button } from "@nextui-org/react";
import { User } from "@nextui-org/user";

// icons
import { MdLogout } from "react-icons/md";
import { FaHome, FaSchool } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";

function InternalAdminDashboard() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutSession = () => {
		dispatch(logOut());
		toast.success("Logged Out Successfully", toastOptions);
		navigate("/");
	};

	const isItemDisabled = user ? false : true;

	return (
		<div className="bg-slate-300 p-4 flex w-full min-h-screen max-h-screen gap-3">
			<Card className="w-1/5 p-3" isDisabled={isItemDisabled}>
				<CardHeader>
					<span className="font-extrabold tracking-wide text-lg text-blue-900 ">
						e-PaathShala
					</span>
				</CardHeader>
				<Divider className="h-1 rounded-md"></Divider>
				{user && (
					<>
						{" "}
						<CardBody className="px-0">
							<NavLink
								to=""
								className="px-3 py-2 my-2 rounded-md flex items-center gap-3">
								<FaHome size={23} className="text-sky-800" />
								Home
							</NavLink>
							<NavLink
								to="new-requests"
								className={({ isActive }) =>
									isActive
										? "bg-sky-200 px-3 py-2 my-2 rounded-md flex items-center gap-3"
										: " px-3 py-2 my-2 rounded-md flex items-center gap-3"
								}>
								<IoPersonAddSharp size={23} className="text-sky-800" />
								New Requests
							</NavLink>
							<NavLink
								to="subscribers-list"
								className={({ isActive }) =>
									isActive
										? "bg-sky-200 px-3 py-2 my-2 rounded-md flex items-center gap-3"
										: " px-3 py-2 my-2 rounded-md flex items-center gap-3"
								}>
								<FaSchool size={23} className="text-sky-800" />
								Subscribers List
							</NavLink>
							<NavLink
								to="messages"
								className={({ isActive }) =>
									isActive
										? "bg-sky-200 px-3 py-2 my-2 rounded-md flex items-center gap-3"
										: " px-3 py-2 my-2 rounded-md flex items-center gap-3"
								}>
								<FaMessage size={23} className="text-sky-800" />
								Messages
							</NavLink>
						</CardBody>
						<CardFooter className="flex-col gap-3 items-start">
							<User
								name={user.adminName || "username"}
								description={user.email || "email id"}
								avatarProps={{
									src: user.profileImage,
								}}
							/>
							<Button
								onClick={logoutSession}
								color="danger"
								variant="ghost"
								className="w-full">
								Logout
							</Button>
						</CardFooter>
					</>
				)}
			</Card>

			{/* Right */}
			<Outlet />
		</div>
	);
}

export default InternalAdminDashboard;
