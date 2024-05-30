import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { Select, SelectItem, Avatar, Button } from "@nextui-org/react";

import { MdArrowDropDown } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import NoFound from "../../assets/no_data.jpg";
import { toast } from "react-toastify";

function TeacherStudentsTab() {
	const classes = [
		{ id: 1, label: "Class 1" },
		{ id: 2, label: "Class 2" },
		{ id: 3, label: "Class 3" },
		{ id: 4, label: "Class 4" },
	];

	const [data, setData] = useState([]);
	const user = useSelector((state) => state.auth.user);

	// const getData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${import.meta.env.VITE_API_BASE_URL}/admin/students/all`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					Authorization: `Bearer ${user.token}`,
	// 				},
	// 			}
	// 		);
	// 		console.log(response);

	// 		if (response.ok) {
	// 			const result = await response.json();
	// 			console.log(result);
	// 			setData(result.data);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const refresh = () => {
	// 	getData();
	// 	toast.success("Refreshed", {
	// 		pauseOnHover: false,
	// 		autoClose: 2000,
	// 		closeOnClick: true,
	// 		position: "bottom-right",
	// 	});
	// };

	// useEffect(() => {
	// 	getData();
	// }, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Students Tab
				</h1>
				<div className="flex justify-end gap-3">
					<Button color="secondary" isIconOnly>
						<MdOutlineRefresh size={19} />
					</Button>
					<Select
						color="secondary"
						size="sm"
						label="Select Class"
						className="w-[120px]">
						{classes.map((c) => (
							<SelectItem key={c.id}>{c.label}</SelectItem>
						))}
					</Select>
				</div>
			</CardHeader>
			<CardBody>
				{data.length > 0 ? (
					<table>
						<thead className="">
							<tr className="flex justify-between  p-2 bg-pink-300 rounded-lg">
								<td className="w-[60px]">Avatar</td>
								<td className="w-[12.55%]">Name</td>
								<td className="w-[12.55%]">Email</td>
								<td className="w-[12.55%]">Contact No.</td>
								<td className="w-[12.55%]">Course</td>
								<td className="w-[12.55%]">Branch</td>
								<td className="w-[12.55%]">Gender</td>
								<td className="w-[12.55%]">Actions</td>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr
									key={d._id}
									className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-[60px]">
										<Avatar
											showFallback
											src={d.profileImage}
											fallback={<FaRegUser size={16} />}
										/>
									</td>
									<td className="w-[12.55%]">{d.fullName}</td>
									<td className="w-[12.55%]">{d.email}</td>
									<td className="w-[12.55%]">+91 {d.contactNo}</td>
									<td className="w-[12.55%]">{d.course.name}</td>
									<td className="w-[12.55%]">{d.branch.name}</td>
									<td className="w-[12.55%]">{d.gender}</td>
									<td className="w-[12.55%]">
										<Tooltip offset={10} content="View">
											<Link to={d._id}>
												<button className="mx-2 bg-green-700 text-white p-2 rounded-full">
													<FaRegEye />
												</button>
											</Link>
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

export default TeacherStudentsTab;
