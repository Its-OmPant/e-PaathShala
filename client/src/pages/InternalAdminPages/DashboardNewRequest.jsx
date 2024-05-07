import React, { useEffect, useState } from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar, Button } from "@nextui-org/react";

import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Tooltip,
} from "@nextui-org/react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Checkbox,
	Input,
	Link,
	Chip,
} from "@nextui-org/react";

import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";

function DashboardNewRequest() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
			case "actions":
				return (
					<div className="relative flex justify-between items-center">
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<FiEdit size="24" />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<MdDelete size="24" />
							</span>
						</Tooltip>
						<Tooltip color="warning" content="Add Admin">
							<span className="text-lg text-warning cursor-pointer active:opacity-50">
								<IoMdPersonAdd size="24" onClick={addToAdmin} />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

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
				console.log(newData);
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

	const addToAdmin = async (e) => {
		// Implement Add Admin functionality
	};

	// table columns
	const columns = [
		{
			key: "fullName",
			label: "NAME",
		},
		{
			key: "email",
			label: "Email ID",
		},
		{
			key: "schoolName",
			label: "School Name",
		},
		{
			key: "isRegistered",
			label: "Registered",
		},
		{
			key: "actions",
			label: "Actions",
		},
	];

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h3 className="text-md font-semibold tracking-wide">
					New Subscription Requests
				</h3>
				<div className="flex gap-3">
					<Button onClick={getData}>
						<MdOutlineRefresh />
					</Button>
					<Button onClick={onOpen}>Add Admin</Button>
					<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Add Admin
									</ModalHeader>
									<ModalBody>
										<Input
											autoFocus
											label="Full Name"
											placeholder="Enter Full Name"
											variant="bordered"
										/>
										<Input
											autoFocus
											label="Email"
											placeholder="Enter your email"
											variant="bordered"
										/>
										<Input
											autoFocus
											label="School Name"
											placeholder="Enter School Name"
											variant="bordered"
										/>
										<div className="flex py-2 px-1 justify-between">
											<Checkbox
												classNames={{
													label: "text-small",
												}}>
												Remember me
											</Checkbox>
											<Link color="primary" href="#" size="sm">
												Forgot password?
											</Link>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="flat" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={onClose}>
											Sign in
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</CardHeader>
			<Divider className="h-1 my-1"></Divider>
			<CardBody>
				{data.length > 0 ? (
					<Table removeWrapper aria-label="Table">
						<TableHeader columns={columns}>
							{(column) => (
								<TableColumn key={column.key}>{column.label}</TableColumn>
							)}
						</TableHeader>
						<TableBody items={data}>
							{(item) => (
								<TableRow key={item.key}>
									{(columnKey) => (
										<TableCell>{renderCell(item, columnKey)}</TableCell>
									)}
								</TableRow>
							)}
						</TableBody>
					</Table>
				) : (
					<h3>No Data Available..</h3>
				)}
			</CardBody>
		</Card>
	);
}

export default DashboardNewRequest;
