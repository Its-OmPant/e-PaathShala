import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Input } from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";

function AddNewCourse() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [file, setFile] = useState(null);

	const handleImageChange = (e) => {
		setFile(e.target.files[0]);
	};

	const submitData = async (e) => {
		e.preventDefault();
		// console.log(file);

		if (!formData.name || !file) {
			toast.error("All Fields are Required", toastOptions);
			return;
		}

		const formDataObject = new FormData();

		formDataObject.append("name", formData.name);
		formDataObject.append("admin_id", user.id);
		formDataObject.append("coverImage", file);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/courses/create`,
				{
					method: "POST",
					body: formDataObject,
				}
			);
			console.log(response);

			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				toast.success(result.message, toastOptions);
				navigate("/admin/courses");
			} else {
				const error = await response.json();
				toast.error(error.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/courses">
					<MdArrowBack />
				</Link>
				<h1>Add New Course</h1>
			</CardHeader>
			<CardBody>
				<form action="" className="w-1/2 mx-auto flex flex-col gap-5 mt-4">
					{file ? (
						<img src={URL.createObjectURL(file)} />
					) : (
						<div className="w-[350px] h-[250px] p-3 bg-slate-300 mx-auto rounded-sm"></div>
					)}
					<input
						width={350}
						height={250}
						type="file"
						required={true}
						onChange={handleImageChange}
					/>

					<Input
						isRequired
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						label="Full Name"
						color="primary"></Input>

					<Button onClick={submitData} color="danger" className="my-4 rounded">
						Add New Course
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewCourse;
