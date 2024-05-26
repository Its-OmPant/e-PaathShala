import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { MdArrowBack } from "react-icons/md";
import { toastOptions } from "../../Constants.js";

function AddNewSubject() {
	const navigator = useNavigate();
	const params = useParams();
	const course_id = params.id;

	const user = useSelector((state) => state.auth.user);

	const [formData, setFormData] = useState({
		name: "",
		code: "",
		branchId: "",
		teacherId: "",
	});

	const [branches, setBranches] = useState();
	const [teachers, setTeachers] = useState();

	const [coverImage, setCoverImage] = useState();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setCoverImage(e.target.files[0]);
	};

	const getBranches = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/branches/${course_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				setBranches(result.data);
			} else {
				const err = await response.json();
				console.log(err);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};
	const getTeachers = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/teachers/list`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				setTeachers(result.data);
			} else {
				const err = await response.json();
				console.log(err);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	const submitForm = async (e) => {
		e.preventDefault();
		console.log(formData);
		console.log(coverImage);
		if (
			!formData.name ||
			!formData.code ||
			!formData.branchId ||
			!formData.teacherId ||
			!coverImage
		) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		const formdataObject = new FormData();
		formdataObject.append("name", formData.name);
		formdataObject.append("code", formData.code);
		formdataObject.append("branchId", formData.branchId);
		formdataObject.append("teacherId", formData.teacherId);
		formdataObject.append("coverImage", coverImage);
		formdataObject.append("courseId", course_id);
		formdataObject.append("admin_id", user.id);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/subjects/create`,
				{
					method: "POST",
					body: formdataObject,
				}
			);
			console.log(response);

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				toast.success("Subject Added Successfully", toastOptions);
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

	useEffect(() => {
		getBranches();
		getTeachers();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to={`/admin/courses/${course_id}`}>
					<MdArrowBack />
				</Link>
				<h1>Add New Subject</h1>
			</CardHeader>
			<CardBody>
				<form action="" className="w-1/2 mx-auto flex flex-col gap-5">
					{coverImage ? (
						<img src={URL.createObjectURL(coverImage)} />
					) : (
						<div className="w-[350px] h-[250px] p-3 bg-secondary-100 mx-auto rounded-sm"></div>
					)}

					<input
						width={300}
						height={200}
						type="file"
						required={true}
						onChange={handleImageChange}
						className="mx-auto"
					/>
					<div className="flex gap-3">
						<Input
							isRequired
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							label="Subject Name"
							color="secondary"></Input>
						<Input
							isRequired
							type="text"
							name="code"
							value={formData.code}
							onChange={handleInputChange}
							label="Subject Code"
							color="secondary"></Input>{" "}
					</div>

					<div className="flex gap-3">
						<Select
							isRequired
							name="branchId"
							value={formData.branchId}
							onChange={handleInputChange}
							label="Select Branch"
							color="secondary">
							{branches && branches.length > 0 ? (
								branches.map((b) => (
									<SelectItem key={b._id} value={b._id}>
										{b.name}
									</SelectItem>
								))
							) : (
								<SelectItem>No Branch Found</SelectItem>
							)}
						</Select>
						<Select
							isRequired
							name="teacherId"
							value={formData.teacherId}
							onChange={handleInputChange}
							label="Select Teacher"
							color="secondary">
							{teachers && teachers.length > 0 ? (
								teachers.map((t) => (
									<SelectItem key={t._id} value={t._id}>
										{t.fullName}
									</SelectItem>
								))
							) : (
								<SelectItem>No Teachers Found</SelectItem>
							)}
						</Select>
					</div>

					<Button
						color="secondary"
						className="my-4 rounded"
						onClick={submitForm}>
						Create Subject
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewSubject;
