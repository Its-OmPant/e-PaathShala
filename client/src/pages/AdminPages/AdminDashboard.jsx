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
import { FaCalendarDays } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaCompassDrafting } from "react-icons/fa6";

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
							<FaUserGraduate size={21} className="text-pink-800" />
							Students
						</NavLink>

						<NavLink
							to="teachers"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaChalkboardTeacher size={21} className="text-green-800" />
							Teachers
						</NavLink>

						<NavLink
							to="courses"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaBookOpen size={21} className="text-orange-800" />
							Courses
						</NavLink>

						<NavLink
							to="subjects"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaCompassDrafting size={21} className="text-yellow-800" />
							Subjects
						</NavLink>

						<NavLink
							to="notices"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaCalendarDays size={21} className="text-fuchsia-800" />
							Notices
						</NavLink>

						<NavLink
							to="digital-library"
							className={({ isActive }) =>
								isActive
									? "bg-sky-300 px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
									: "bg-white px-3 py-2 my-1.5 rounded-md flex items-center gap-3"
							}>
							<FaBookAtlas size={21} className="text-slate-800" />
							Digital Library
						</NavLink>
					</CardBody>
					<CardFooter className="flex-col gap-3 items-start">
						<NavLink to="profile">
							<User
								className="justify-start gap-4 "
								name={user.fullName}
								description={user.email}
								avatarProps={{
									src: user.profileImage,
								}}
							/>
						</NavLink>
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
