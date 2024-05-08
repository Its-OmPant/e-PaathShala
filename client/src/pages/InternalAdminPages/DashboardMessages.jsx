import React, { useEffect, useState } from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip, Button, Textarea } from "@nextui-org/react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Input,
} from "@nextui-org/react";

// images
import NoFound from "../../assets/no_data.jpg";

import { MdOutlineRefresh } from "react-icons/md";

import { toast } from "react-toastify";
function DashboardMessages() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const toastOptions = {
		position: "bottom-right",
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	const [data, setData] = useState([]);

	// function to get list of subscribers
	const getData = async () => {
		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/internal/admin/contacts/all",
				{
					method: "GET",
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				const newData = data.data?.map((d) => ({
					...d,
					key: d._id,
				}));
				// console.log(newData);
				setData(newData);
			} else {
				const errData = await response.json();
				return toast.error(errData.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError:: ", error);
			toast.error("Something Unexpected Occured", toastOptions);
		}
	};

	const [rowData, setRowData] = useState({
		fullName: "",
		email: "",
		description: "",
	});

	// function to open a modal for a row
	const openRequestRow = async (index) => {
		const selectedRowData = data[index];
		setRowData(selectedRowData);
		onOpen();
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
					Dashboard Subscribers List
				</h3>

				<Tooltip color="primary" content="Refresh">
					<Button onClick={refresh} color="primary">
						<MdOutlineRefresh size={22} />
					</Button>
				</Tooltip>

				<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Subscriber Details
								</ModalHeader>
								<ModalBody>
									<Input
										autoFocus
										label="Full Name"
										variant="bordered"
										value={rowData.fullName}
										readOnly
									/>
									<Input
										autoFocus
										label="Email"
										variant="bordered"
										value={rowData.email}
										readOnly
									/>
									<Textarea
										autoFocus
										label="Message"
										variant="bordered"
										value={rowData.description}
										readOnly></Textarea>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="flat" onPress={onClose}>
										Close
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
								<td className="w-1/4">Name</td>
								<td className="w-1/4">Email</td>
								<td className="w-1/4">Message</td>
								<td className="w-1/4">Actions</td>
							</tr>
						</thead>
						<tbody>
							{data.map((d, index) => (
								<tr
									key={d.key}
									className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-1/4 ">{d.fullName}</td>
									<td className="w-1/4 ">{d.email}</td>
									<td className="w-1/4 ">{d.description}</td>
									<td className="w-1/4 ">
										<button
											onClick={() => openRequestRow(index)}
											className="bg-green-200 px-4  mx-2 rounded-lg">
											Read
										</button>
										<button className="bg-red-200 px-4 mx-2 rounded-lg">
											Delete
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

export default DashboardMessages;
