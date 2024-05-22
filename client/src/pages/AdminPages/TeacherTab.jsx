import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { Button, Avatar } from "@nextui-org/react";

import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import NoFound from "../../assets/no_data.jpg";

function TeacherTab() {
	const user = useSelector((state) => state.auth.user);

	const [teachers, setTeachers] = useState([]);

	const getAllTeachersData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/teachers/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				setTeachers(data.data);
			} else {
				const error = await response.json();
				console.log(error);
				return;
			}
		} catch (error) {
			console.log("customError :: ", error);
		}
	};

	const refresh = () => {
		getAllTeachersData();
		toast.success("Refreshed", {
			pauseOnHover: false,
			autoClose: 2000,
			closeOnClick: true,
			position: "bottom-right",
		});
	};

	useEffect(() => {
		getAllTeachersData();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Teachers</h1>
				<div className="flex justify-end gap-3">
					<Button color="secondary" onClick={refresh} isIconOnly>
						<MdOutlineRefresh size={18} />
					</Button>
					<Link to="add">
						<Button color="primary" radius="sm">
							Add New Faculty
						</Button>
					</Link>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				{teachers.length > 0 ? (
					<table>
						<thead className="">
							<tr className="flex justify-between  p-2 bg-warning-200 rounded-lg">
								<td className="w-[60px]">Avatar</td>
								<td className="w-[12.55%]">Name</td>
								<td className="w-[12.55%]">Email</td>
								<td className="w-[12.55%]">Contact No.</td>
								<td className="w-[12.55%]">Gender</td>
								<td className="w-[12.55%]">Courses</td>
								<td className="w-[12.55%]">Actions</td>
							</tr>
						</thead>
						<tbody>
							{teachers.map((t) => (
								<tr
									key={t._id}
									className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-[60px]">
										<Avatar
											showFallback
											src={t.profileImage}
											fallback={<FaRegUser size={16} />}
										/>
									</td>
									<td className="w-[12.55%]">{t.fullName}</td>
									<td className="w-[12.55%]">{t.email}</td>
									<td className="w-[12.55%]">+91 {t.contactNo}</td>
									<td className="w-[12.55%]"> {t.gender} </td>
									<td className="w-[12.55%]">
										{t.teachCourses[0]?.name || "N/A"} , ...{" "}
									</td>
									<td className="w-[12.55%]">
										<Tooltip offset={10} content="View">
											<Link to={t._id}>
												<button className="mx-2 bg-green-700 text-white p-2 rounded-full">
													<FaRegEye />
												</button>
											</Link>
										</Tooltip>

										<Tooltip offset={10} content="Delete">
											<button className="mx-1 bg-pink-600 text-white p-2 rounded-full">
												<MdDeleteOutline />
											</button>
										</Tooltip>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Data Available</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				)}
			</CardBody>
		</Card>
	);
}

export default TeacherTab;
