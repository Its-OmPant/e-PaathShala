import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { Avatar, Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";

// icons
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";

import NoFound from "../../assets/no_data.jpg";
import { toast } from "react-toastify";

function StudentTab() {
	const [data, setData] = useState([]);
	const user = useSelector((state) => state.auth.user);

	const getData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/students/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				setData(result.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const refresh = () => {
		getData();
		toast.success("Refreshed", {
			pauseOnHover: false,
			autoClose: 2000,
			closeOnClick: true,
			position: "bottom-right",
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Students</h1>
				<div className="flex justify-end gap-3">
					<Button color="secondary" onClick={refresh} isIconOnly>
						<MdOutlineRefresh size={19} />
					</Button>

					<Link to="add">
						<Button color="primary" radius="sm">
							Add New Student
						</Button>
					</Link>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				{data.length > 0 ? (
					<table>
						<thead className="">
							<tr className="flex justify-between  p-2 bg-pink-300 rounded-lg">
								<td className="w-[60px]">Avatar</td>
								<td className="w-1/6 text-center">Name</td>
								<td className="w-1/6 text-center">Email</td>
								<td className="w-1/6 text-center">Contact No.</td>
								<td className="w-1/6 text-center">Course</td>
								<td className="w-1/6 text-center">Branch</td>
								<td className="w-1/6 text-center">Gender</td>
								<td className="w-[60px]">Actions</td>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => (
								<tr
									key={d._id}
									className="flex justify-between items-center text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-[60px]">
										<Avatar
											showFallback
											src={d.profileImage}
											fallback={<FaRegUser size={16} />}
											className="bg-blue-200 text-blue-900"
										/>
									</td>
									<td className="w-1/6 text-center">{d.fullName}</td>
									<td className="w-1/6 text-center">{d.email}</td>
									<td className="w-1/6 text-center">+91 {d.contactNo}</td>
									<td className="w-1/6 text-center">{d.course.name}</td>
									<td className="w-1/6 text-center">{d.branch.name}</td>
									<td className="w-1/6 text-center">
										<Chip
											radius="sm"
											variant="flat"
											color={d.gender == "Male" ? "primary" : "danger"}>
											{d.gender}
										</Chip>
									</td>
									<td className="w-[60px]">
										<Tooltip offset={10} content="View">
											<Link to={d._id}>
												<button className="mx-2 bg-slate-500 text-white p-1 rounded-full">
													<IoIosArrowDroprightCircle size={22} />
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

export default StudentTab;
