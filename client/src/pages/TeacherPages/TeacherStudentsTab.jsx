import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Select, SelectItem, Avatar, Button, Input } from "@nextui-org/react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";

// icons
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";

import NoFound from "../../assets/no_data.jpg";

function TeacherStudentsTab() {
	const user = useSelector((state) => state.auth.user);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [data, setData] = useState([]);
	const [courseOptions, setCourseOptions] = useState([]);
	const [branchOptions, setBranchOptions] = useState([]);

	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedBranch, setSelectedBranch] = useState("");

	const handleBranchChange = (e) => {
		if (!selectedCourse) {
			toast.error("Please Select a Course", toastOptions);
			return;
		}
		getBranchesOptions(selectedCourse);
		setSelectedBranch(e.target.value);
	};

	const getCoursesOptions = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/courses/teaches`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			if (response.ok) {
				const result = await response.json();
				setCourseOptions(result.data.teachCourses);
			} else {
				throw "Something Unexpected Occured";
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	const getBranchesOptions = async (courseId) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/branches/teaches`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ courseId }),
				}
			);
			if (response.ok) {
				const result = await response.json();
				setBranchOptions(result.data);
			} else {
				throw "Something Unexpected Occured";
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	const getData = async () => {
		if (!selectedCourse) {
			toast.error("Please Select a Course", toastOptions);
			return;
		}
		if (!selectedBranch) {
			toast.error("Please Select a Branch", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/students`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						courseId: selectedCourse,
						branchId: selectedBranch,
					}),
				}
			);

			if (response.ok) {
				const result = await response.json();
				setData(result.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCoursesOptions();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Students Tab
				</h1>
				<div className="flex justify-end gap-3">
					<Select
						name="courseId"
						value={selectedCourse}
						onChange={(e) => setSelectedCourse(e.target.value)}
						color="secondary"
						size="sm"
						label="Select Course"
						className="w-[200px]">
						{courseOptions.map((c) => (
							<SelectItem key={c._id} value={c._id}>
								{c.name}
							</SelectItem>
						))}
					</Select>

					<Select
						name="branchId"
						value={selectedBranch}
						onClick={handleBranchChange}
						onChange={handleBranchChange}
						color="secondary"
						size="sm"
						label="Select branch"
						className="w-[200px]">
						{branchOptions?.map((b) => (
							<SelectItem key={b.branch._id} value={b.branch._id}>
								{b.branch.name}
							</SelectItem>
						))}
					</Select>
					<Button color="secondary" onClick={getData}>
						{/* <MdOutlineRefresh size={19} /> */}
						Get Data
					</Button>
				</div>
			</CardHeader>
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
											<button
												className="mx-2 bg-slate-500 text-white p-1 rounded-full"
												onClick={onOpen}>
												<IoIosArrowDroprightCircle size={22} />
												<Modal
													size="xl"
													backdrop="blur"
													isDismissable={false}
													isOpen={isOpen}
													onOpenChange={onOpenChange}>
													<ModalContent>
														{(onClose) => (
															<>
																<ModalHeader className="flex flex-col gap-1">
																	Student Details
																</ModalHeader>
																<ModalBody>
																	<form action="">
																		<div className="flex gap-4 justify-center items-center">
																			<Avatar
																				src={d.profileImage}
																				fallback={<FaRegUser size={22} />}
																				className="w-[60px] h-[60px] bg-blue-300"></Avatar>
																			<div>
																				<h2 className="text-lg text-pink-800 font-bold">
																					Name : {d.fullName}
																				</h2>
																				<h3 className="text-md text-slate-700">
																					Email ID : {d.email}
																				</h3>
																			</div>
																		</div>
																		<div className="grid grid-cols-2 gap-4 my-4">
																			<Input
																				isReadOnly
																				type="text"
																				label="Father's Name"
																				variant="bordered"
																				value={d.fatherName || "N/A"}
																				className="max-w-xs"
																			/>
																			<Input
																				isReadOnly
																				type="text"
																				label="Mother's Name"
																				variant="bordered"
																				value={d.motherName || "N/A"}
																				className="max-w-xs"
																			/>
																			<Input
																				isReadOnly
																				type="text"
																				label="Contact Number"
																				variant="bordered"
																				value={d.contactNo}
																				className="max-w-xs"
																			/>
																			<Input
																				isReadOnly
																				type="text"
																				label="Gender"
																				variant="bordered"
																				value={d.gender}
																				className="max-w-xs"
																			/>
																			<Input
																				isReadOnly
																				type="text"
																				label="Course"
																				variant="bordered"
																				value={d.course.name}
																				className="max-w-xs"
																			/>
																			<Input
																				isReadOnly
																				type="text"
																				label="Branch"
																				variant="bordered"
																				value={d.branch.name}
																				className="max-w-xs"
																			/>
																		</div>
																	</form>
																</ModalBody>
																<ModalFooter>
																	<Button
																		color="danger"
																		variant="light"
																		onPress={onClose}>
																		Close
																	</Button>
																	<Button color="primary" onPress={onClose}>
																		Action
																	</Button>
																</ModalFooter>
															</>
														)}
													</ModalContent>
												</Modal>
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

export default TeacherStudentsTab;
