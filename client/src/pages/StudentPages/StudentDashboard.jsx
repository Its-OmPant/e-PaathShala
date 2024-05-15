import { NavLink, Outlet } from "react-router-dom";

import NotFoundPage from "../NotFoundPage.jsx";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { User, Button } from "@nextui-org/react";

// icons
import { MdDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookAtlas } from "react-icons/fa6";
import { IoLogoReact } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { FaChartPie } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

function StudentDashboard() {
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
				<Divider className="h-1 "></Divider>
				<CardBody className="px-0">
					<NavLink
						to="dashboard"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<MdDashboard size={21} className="text-sky-800" />
						Dashboard
					</NavLink>

					<NavLink
						to="subjects"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<IoLogoReact size={21} className="text-sky-800" />
						Subjects
					</NavLink>

					<NavLink
						to="live-classes"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<FaChalkboardTeacher size={21} className="text-sky-800" />
						Live Classes
					</NavLink>

					<NavLink
						to="chat-groups"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<TiMessages size={21} className="text-sky-800" />
						Chat Groups
					</NavLink>

					<NavLink
						to="attendance"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<FaChartPie size={21} className="text-sky-800" />
						Attendance
					</NavLink>

					<NavLink
						to="digital-library"
						className={({ isActive }) =>
							isActive
								? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
								: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
						}>
						<FaBookAtlas size={21} className="text-sky-800" />
						Digital Library
					</NavLink>
				</CardBody>
				<CardFooter className="flex-col gap-3 items-start">
					<User
						className="justify-start gap-4 "
						name="Jane Doe"
						description="Product Designer"
						avatarProps={{
							src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
						}}
					/>
					<Button
						color="danger"
						variant="ghost"
						className="w-full"
						endContent={<MdLogout />}>
						Logout
					</Button>
				</CardFooter>
			</Card>

			{/* Right */}
			<Outlet />
		</div>
	);
}

export default StudentDashboard;
