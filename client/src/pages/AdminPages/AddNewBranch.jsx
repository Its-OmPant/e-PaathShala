import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { MdArrowBack } from "react-icons/md";
import { toastOptions } from "../../Constants.js";

function AddNewBranch() {
	const navigator = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [formData, setFormData] = useState({
		name: "",
	});
	const params = useParams();

	const courseId = params.id;

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (!formData.name) {
			toast.error("Branch Name is required", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/course/branch/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ name: formData.name, courseId }),
				}
			);
			console.log(response);

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				toast.success("Branch Added Successfully", toastOptions);
				navigator(-1);
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
				return;
			}
		} catch (error) {
			console.log("customError:: ", error);
		}
	};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/teachers">
					<MdArrowBack />
				</Link>
				<h1>Add New Branch</h1>
			</CardHeader>

			<CardBody>
				<form action="" className="w-1/2 mx-auto flex flex-col gap-5 mt-16">
					<Input
						isRequired
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						label="Branch Name"
						color="primary"></Input>

					<Button color="danger" className="my-4 rounded" onClick={submitForm}>
						Create Branch
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewBranch;
