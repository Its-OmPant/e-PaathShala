import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar, Button } from "@nextui-org/react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Tooltip,
	Input,
	Chip,
} from "@nextui-org/react";

import { toast } from "react-toastify";
import { MdOutlineRefresh } from "react-icons/md";

// images
import NoFound from "../../assets/no_data.jpg";

function DashboardNewRequest() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const navigator = useNavigate();

	const [rowData, setRowData] = useState({
		fullName: "",
		email: "",
		schoolName: "",
	});

	const toastOptions = {
		position: "bottom-right",
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	// to determine chip color
	const statusColorMap = {
		true: "success",
		false: "danger",
	};

	const [data, setData] = useState([]);

	// function to render custom column cell in table
	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
			case "isRegistered":
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[user.isRegistered]}
						size="sm"
						variant="flat">
						{cellValue}
					</Chip>
				);
			default:
				return cellValue;
		}
	}, []);

	// function to get list of subscription request
	const getData = async () => {
		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/internal/admin/subscription/all",
				{
					method: "GET",
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				const newData = data.data?.map((d) => ({
					...d,
					key: d._id,
					isRegistered: d.isRegistered.toString(),
				}));
				// console.log(newData);
				setData(newData);
				toast.success("Reloaded", toastOptions);
			} else {
				const errData = await response.json();
				throw errData.message;
			}
		} catch (error) {
			console.log("CustomError:: ", error);
			toast.error("Something Unexpected Occured", toastOptions);
		}
	};

	// function to open a modal for a row
	const openRequestRow = async (index) => {
		const selectedRowData = data[index];
		setRowData(selectedRowData);
		onOpen();
	};

	const registerUser = async (e) => {
		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/internal/admin/create/AdminAccount",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(rowData),
				}
			);
			console.log(response);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				toast.success(data.message, toastOptions);
			} else {
				const errData = await response.json();
				throw errData.message;
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h3 className="text-md font-semibold tracking-wide">
					New Subscription Requests
				</h3>
				<Tooltip color="primary" content="Refresh">
					<Button onClick={getData}>
						<MdOutlineRefresh />
					</Button>
				</Tooltip>
				<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Subscription Request
								</ModalHeader>
								<ModalBody>
									<Input
										autoFocus
										label="Full Name"
										placeholder="Enter Full Name"
										variant="bordered"
										value={rowData.fullName}
										readOnly
									/>
									<Input
										autoFocus
										label="Email"
										placeholder="Enter your email"
										variant="bordered"
										value={rowData.email}
										readOnly
									/>
									<Input
										autoFocus
										label="School Name"
										placeholder="Enter School Name"
										variant="bordered"
										value={rowData.schoolName}
										readOnly
									/>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="flat" onPress={onClose}>
										Close
									</Button>
									<Button color="primary" onPress={registerUser}>
										Register User
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</CardHeader>
			<Divider className="h-1"></Divider>
			<CardBody>
				{data.length > 0 ? (
					<table>
						<thead className="bg-slate-200 p-2 rounded-md">
							<tr className="flex justify-between text-slate-700 p-2">
								<td className="w-1/5">Name</td>
								<td className="w-1/5">Email</td>
								<td className="w-1/5">School Name</td>
								<td className="w-1/5">Is registered</td>
								<td className="w-1/5">Actions</td>
							</tr>
						</thead>
						<tbody>
							{data.map((d, index) => (
								<tr
									key={d.key}
									className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-1/5">{d.fullName}</td>
									<td className="w-1/5">{d.email}</td>
									<td className="w-1/5">{d.schoolName}</td>
									<td className="w-1/5">{d.isRegistered}</td>
									<td className="w-1/5">
										<button
											onClick={() => openRequestRow(index)}
											className="bg-green-200 px-4 rounded-lg">
											Add
										</button>
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

export default DashboardNewRequest;
