import React, { useState, useEffect } from "react";
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
		college: "",
	});

	const toastOptions = {
		position: "bottom-right",
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	const [data, setData] = useState([]);

	// function to get list of subscription request
	const getData = async () => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/internal/admin/subscriptionRequest/all`,
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
				`${
					import.meta.env.VITE_API_BASE_URL
				}/internal/admin/create/AdminAccount`,
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
				return toast.error(errData.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	const refresh = () => {
		getData();
		toast.success("Reloaded", toastOptions);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h3 className="text-md font-semibold tracking-wide">
					New Subscription Requests
				</h3>
				<Tooltip color="primary" content="Refresh">
					<Button onClick={refresh}>
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
										label="College Name"
										placeholder="Enter School Name"
										variant="bordered"
										value={rowData.college}
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
			<CardBody>
				{data.length > 0 ? (
					<table>
						<thead>
							<tr className="flex justify-between  p-2 bg-pink-300 rounded-md">
								<td className="w-1/5">Name</td>
								<td className="w-1/5">Email</td>
								<td className="w-1/5">College Name</td>
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
									<td className="w-1/5">{d.college}</td>
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
