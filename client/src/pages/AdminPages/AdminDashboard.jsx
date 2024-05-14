import { NavLink, Outlet } from "react-router-dom";

import NotFoundPage from "../NotFoundPage.jsx";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

// icons
import { MdDashboard } from "react-icons/md";
import { FaAtlas, FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookAtlas, FaBookOpen } from "react-icons/fa6";
import { AiFillNotification } from "react-icons/ai";

function AdminDashboard() {
	const user = useSelector((state) => state.auth.user);

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
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<MdDashboard size={21} className="text-sky-800" />
							Dashboard
						</NavLink>

						<NavLink
							to="students"
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaUserGraduate size={21} className="text-sky-800" />
							Students
						</NavLink>

						<NavLink
							to="teachers"
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaChalkboardTeacher size={21} className="text-sky-800" />
							Teachers
						</NavLink>

						<NavLink
							to="courses"
							className="bg-slate-200/80 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaBookOpen size={21} className="text-sky-800" />
							Courses
						</NavLink>

						<NavLink
							to="notices"
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<AiFillNotification size={21} className="text-sky-800" />
							Notices
						</NavLink>

						<NavLink
							to="notices"
							className="bg-slate-200 hover:bg-slate-300/70 px-3 py-2 my-1.5 rounded-md flex items-center gap-3">
							<FaBookAtlas size={21} className="text-sky-800" />
							Digital Library
						</NavLink>
					</CardBody>
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
