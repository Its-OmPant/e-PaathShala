import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

import { MdArrowBack } from "react-icons/md";
import { toastOptions } from "../../Constants.js";

function AddNewTeacher() {
	const navigator = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		contactNo: "",
		password: "",
		gender: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (
			!formData.fullName ||
			!formData.email ||
			!formData.contactNo ||
			!formData.password ||
			!formData.gender
		) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/teachers/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			// console.log(response);

			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				toast.success("Teacher Added Successfully", toastOptions);
				navigator("/admin/teachers");
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
				return;
			}
		} catch (error) {
			console.log("customError:: ", error);
		}
	};

	const gender = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/teachers">
					<MdArrowBack />
				</Link>
				<h1>Add New Faculty</h1>
			</CardHeader>
			<CardBody>
				<form action="" className="w-1/2 mx-auto flex flex-col gap-5 mt-16">
					<Input
						isRequired
						type="text"
						name="fullName"
						value={formData.fullName}
						onChange={handleInputChange}
						label="Full Name"
						color="primary"></Input>
					<Input
						isRequired
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						label="Emai Id"
						color="primary"></Input>
					<Input
						isRequired
						type="text"
						name="contactNo"
						value={formData.contactNo}
						onChange={handleInputChange}
						label="Contact Number"
						color="primary"></Input>

					<div className="flex gap-4">
						<Input
							isRequired
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							type="password"
							label="Password"
							color="primary"></Input>

						<Select
							name="gender"
							value={formData.gender}
							onChange={handleInputChange}
							label="Gender"
							placeholder="Select gender"
							color="primary"
							isRequired
							className="max-w-xs">
							{gender.map((g) => (
								<SelectItem key={g.value} value={g.value}>
									{g.label}
								</SelectItem>
							))}
						</Select>
					</div>

					<Button color="danger" className="my-4 rounded" onClick={submitForm}>
						Create Faculty
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewTeacher;
