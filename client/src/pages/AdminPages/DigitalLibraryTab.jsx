import React, { useEffect, useState } from "react";
import Resource from "../../components/Resource";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RotatingLines } from "react-loader-spinner";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";

import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";
import NoFound from "../../assets/no_data.jpg";

function DigitalLibraryTab() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [file, setFile] = useState(null);

	const handleImageChange = (e) => {
		setFile(e.target.files[0]);
	};

	const [formData, setFormData] = useState({
		name: "",
		file_url: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitData = async (e) => {
		if (!formData.name || !formData.file_url || !file) {
			toast.error("Al Fields are required", toastOptions);
			return;
		}

		const bodyData = new FormData();

		bodyData.append("name", formData.name);
		bodyData.append("file_url", formData.file_url);
		bodyData.append("admin_id", user.id);
		bodyData.append("image", file);

		try {
			setLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/library/resource/create`,
				{
					method: "POST",
					body: bodyData,
				}
			);

			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				toast.success(result.message, toastOptions);
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
			setLoading(false);
			onClose();
		} catch (error) {
			onClose();
			setLoading(false);
			console.log("CustomError :: ", error);
		}
	};

	const getAllResuorces = async (e) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/library/resource/all/${
					user.college
				}`
			);

			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				setResources(result.data);
			} else {
				const err = await response.json();
				console.error(err.message, toastOptions);
			}
		} catch (error) {
			console.error("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getAllResuorces();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Digital Library</h1>
				<div className="flex justify-end">
					<Button onClick={onOpen} color="secondary">
						Add Resourse
					</Button>
					<Modal size="xl" isOpen={isOpen} onClose={onClose} backdrop="blur">
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Add Resource
									</ModalHeader>
									<ModalBody>
										<form action="">
											<Input
												type="text"
												label="Resource Name"
												color="primary"
												className="my-2"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
											/>
											<Input
												type="text"
												label="Resource Link"
												color="primary"
												className="my-2"
												name="file_url"
												value={formData.file_url}
												onChange={handleInputChange}
											/>
											<input
												type="file"
												className="p-3 bg-primary-100 w-full rounded-md mb-2"
												onChange={handleImageChange}
											/>
											{file ? (
												<img
													className="max-h-[250px] w-full"
													src={URL.createObjectURL(file)}
												/>
											) : (
												<div></div>
											)}
										</form>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Cancel
										</Button>
										<Button color="primary" onPress={submitData}>
											{loading ? (
												<RotatingLines
													visible={true}
													height="96"
													width="96"
													strokeWidth="5"
													animationDuration="0.50"
													ariaLabel="rotating-lines-loading"
												/>
											) : (
												"Add"
											)}
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				{resources && resources.length > 0 ? (
					<div className="grid grid-cols-5">
						{resources.map((r) => (
							<Link to={r.file_url} key={r._id} target="_blank">
								<Resource resName={r.name} imageUrl={r.image_url} />
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Courses Found</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				)}
			</CardBody>
		</Card>
	);
}

export default DigitalLibraryTab;
