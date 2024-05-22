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

function AddNewStudent() {
	const navigator = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		contactNo: "",
		password: "",
		course: "",
		branch: "",
		gender: "",
	});

	let defaultDate = today(getLocalTimeZone());
	const [dob, setDob] = useState(defaultDate);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "course") {
			const selectedCourse = courses.find((c) => c._id == e.target.value);
			setBranches(selectedCourse.branches);
		}
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (
			!formData.fullName ||
			!formData.email ||
			!formData.contactNo ||
			!formData.password ||
			!formData.course ||
			!formData.branch ||
			!formData.gender ||
			!dob
		) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		const dateOfBirth = `${dob.year}-${dob.month}-${dob.day}`;

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/students/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						fullName: formData.fullName,
						email: formData.email,
						contactNo: formData.contactNo,
						password: formData.password,
						gender: formData.gender,
						courseId: formData.course,
						branchId: formData.branch,
						dateOfBirth,
					}),
				}
			);
			// console.log(response);

			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				toast.success("Student Added Successfully", toastOptions);
				navigator("/admin/students");
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
				return;
			}
		} catch (error) {
			console.log("customError:: ", error);
		}
	};

	// let courses = [];
	const [courses, setCourses] = useState([]);
	const [branches, setBranches] = useState([]);

	const gender = [
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
	];

	// fetching all courses and branches
	const getCoursesData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/courses/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				setCourses(result.data);
			} else {
				const err = await response.json();
				console.log(err);
			}
		} catch (error) {
			console.log("CustomError:: ", error);
		}
	};

	useEffect(() => {
		getCoursesData();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/students">
					<MdArrowBack />
				</Link>
				<h1>Add New Student</h1>
			</CardHeader>
			<CardBody>
				<form action="" className="w-1/2 mx-auto flex flex-col gap-3">
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
					<div className="flex gap-3">
						<Input
							isRequired
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							type="password"
							label="Password"
							color="primary"></Input>
						<DatePicker
							name="dob"
							value={dob}
							onChange={setDob}
							isRequired
							label="Date Of Birth"
							color="primary"
						/>
					</div>
					<div className="flex gap-3">
						<Select
							name="course"
							value={formData.course}
							onChange={handleInputChange}
							label="Course"
							placeholder="Select a Course"
							color="primary"
							isRequired
							className="max-w-xs">
							{courses.map((c) => (
								<SelectItem key={c._id} value={c._id}>
									{c.name}
								</SelectItem>
							))}
						</Select>
						<Select
							name="branch"
							value={formData.branch}
							onChange={handleInputChange}
							label="Branch"
							placeholder="Select a Branch"
							color="primary"
							isRequired
							className="max-w-xs">
							{branches.map((c) => (
								<SelectItem key={c._id} value={c._id}>
									{c.name}
								</SelectItem>
							))}
						</Select>
						<Select
							name="gender"
							value={formData.gender}
							onChange={handleInputChange}
							label="Gender"
							placeholder="Select gender"
							color="primary"
							isRequired
							className="max-w-xs">
							{gender.map((c) => (
								<SelectItem key={c.value} value={c.value}>
									{c.label}
								</SelectItem>
							))}
						</Select>
					</div>

					<Button color="primary" className="my-4 rounded" onClick={submitForm}>
						Create
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewStudent;
