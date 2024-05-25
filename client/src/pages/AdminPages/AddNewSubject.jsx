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
		teacherId: "",
	});

	const [coverImage, setCoverImage] = useState();

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setCoverImage(e.target.files[0]);
	};

	const submitForm = async (e) => {};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/teachers">
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
							name="branch"
							label="Select Branch"
							color="secondary">
							<SelectItem>Computer Science</SelectItem>
							<SelectItem>Information Technology</SelectItem>
						</Select>
						<Select
							isRequired
							name="teacher"
							label="Select Teacher"
							color="secondary">
							<SelectItem>Amit Mishra</SelectItem>
							<SelectItem>Saurabh Diwedi</SelectItem>
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
