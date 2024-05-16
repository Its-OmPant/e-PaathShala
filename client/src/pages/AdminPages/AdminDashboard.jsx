import { NavLink, Outlet, useNavigate } from "react-router-dom";

import NotFoundPage from "../NotFoundPage.jsx";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// redux related
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { User, Button } from "@nextui-org/react";

// icons
import { MdDashboard } from "react-icons/md";
import { FaAtlas, FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookAtlas, FaBookOpen } from "react-icons/fa6";
import { AiFillNotification } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

function AdminDashboard() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutSession = () => {
		dispatch(logOut());
		toast.success("Logged Out Successfully", toastOptions);
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
							to="students"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaUserGraduate size={21} className="text-sky-800" />
							Students
						</NavLink>

						<NavLink
							to="teachers"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaChalkboardTeacher size={21} className="text-sky-800" />
							Teachers
						</NavLink>

						<NavLink
							to="courses"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaBookOpen size={21} className="text-sky-800" />
							Courses
						</NavLink>

						<NavLink
							to="notices"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<AiFillNotification size={21} className="text-sky-800" />
							Notices
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
							name={user.fullName}
							description={user.email}
							avatarProps={{
								src: user.profileImage,
							}}
						/>
						<Button
							onClick={logoutSession}
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
	} else {
		content = <NotFoundPage />;
	}

	return content;
}

export default AdminDashboard;
