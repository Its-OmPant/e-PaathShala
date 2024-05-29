import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// nextUI Components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar, Button } from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";

function StudentProfilePage() {
	const user = useSelector((state) => state.auth.user);

	const params = useParams();
	const navigate = useNavigate();
	const studentId = params.id;
	const [student, setStudent] = useState();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const getStudentProfile = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/students/${studentId}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				setStudent(data.data);
			} else {
				const err = await response.json();
				console.log(err);
				return;
			}
		} catch (error) {
			console.log("customError :: ", error);
		}
	};

	const deleteStudent = async (e) => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/admin/students/delete/${studentId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				toast.success("Student Deleted", toastOptions);
				navigate(-1);
			} else {
				toast.error("Something unexpected Occured", toastOptions);
			}
		} catch (error) {
			console.log("Custom Error :: ", error);
		}
	};

	useEffect(() => {
		getStudentProfile();
	}, []);
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<div className="flex gap-3 items-center">
					<Link to="/admin/students">
						<MdArrowBack />
					</Link>
					<h1>Student Profile</h1>
				</div>
				<div className="flex justify-end gap-3">
					<Button color="primary" isDisabled>
						Edit
					</Button>
					<Button color="danger" onClick={onOpen}>
						Delete
					</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1 text-red-500">
										Are You Sure ?
									</ModalHeader>
									<ModalBody>
										<p>
											This action can't be reversed and the data will be deleted
											permanently
										</p>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Close
										</Button>
										<Button
											color="danger"
											onPress={() => {
												onClose();
												deleteStudent();
											}}>
											Delete
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</CardHeader>
			<CardBody className="items-center">
				<div className="w-3/5 mt-16 bg-gray-100 shadow-md rounded-md p-4">
					<div className="flex justify-evenly items-center">
						<Avatar
							src={student?.profileImage}
							fallback={<FaRegUser size={45} />}
							className="w-[140px] h-[140px] bg-blue-300"></Avatar>
						<div>
							<h2 className="text-2xl text-pink-800 font-bold">
								Name : {student?.fullName}
							</h2>
							<h3 className="text-lg text-slate-700">
								Email ID : {student?.email}
							</h3>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Input
							isReadOnly
							type="text"
							label="Father's Name"
							variant="bordered"
							value={student?.fatherName || "N/A"}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Mother's Name"
							variant="bordered"
							value={student?.motherName || "N/A"}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Contact Number"
							variant="bordered"
							value={student?.contactNo}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Gender"
							variant="bordered"
							value={student?.gender}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Course"
							variant="bordered"
							value={student?.course.name}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Branch"
							variant="bordered"
							value={student?.branch.name}
							className="max-w-xs"
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default StudentProfilePage;
