import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// redux related
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../features/auth/authSlice.js";

// nextUI Components
import { Input, Button } from "@nextui-org/react";
import { RadioGroup, Radio, cn, Image } from "@nextui-org/react";

// Custom Components
import Navbar from "../components/Navbar";
import CustomRadio from "../components/CustomRadio";

// Images
import LoginImage from "../assets/login.jpg";
import studentImage from "../assets/student.png";
import teacherImage from "../assets/teacher.png";
import adminImage from "../assets/admin.png";

import { toast } from "react-toastify";
import { toastOptions } from "../Constants.js";

function LoginPage() {
	const dispatch = useDispatch();
	const navigator = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [accountType, setAccountType] = useState(false);

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAccountTypeChange = (e) => {
		setAccountType(e.target.value);
	};

	const submitFormData = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password || !formData.confirmPassword) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Password do not match", toastOptions);
			return;
		}

		if (!accountType) {
			toast.warning("Please Select Account Type", toastOptions);
			return;
		}

		// hitting the api
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/${accountType}/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				toast.success("Logged In Successfully", toastOptions);
				const route = data.data.role;
				dispatch(setLoggedInUser(data.data));
				navigator(`/${route}`);
			} else {
				const errData = await response.json();
				toast.error(errData?.message, toastOptions);
				throw "Can't Login, Some error occured";
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.error("CustomError :: ", error);
		}
	};

	return (
		<div className=" bg-slate-300 py-2">
			<Navbar />

			<div className="mt-4 mx-8 flex justify-between bg-white rounded-md">
				<div className="w-1/2">
					<h3 className="text-xl text-center font-bold text-slate-800 my-4">
						Login
					</h3>
					<Image src={LoginImage} alt="" className="w-4/5" />
				</div>
				<div className="w-1/2 pt-8">
					<form action="" className="w-4/5 mx-auto">
						<Input
							color="primary"
							type="email"
							label="Email"
							isRequired
							description="Enter Your Email ID "
							className="my-4"
							name="email"
							value={formData.email}
							onChange={handleInput}
						/>
						<Input
							color="primary"
							type="password"
							label="Password"
							isRequired
							description="Enter Your Password"
							className="my-4"
							name="password"
							value={formData.password}
							onChange={handleInput}
						/>
						<Input
							color="primary"
							type="password"
							label="Confirm Password"
							isRequired
							description="Enter Your Password Again"
							className="my-4"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInput}
						/>
						<RadioGroup
							isRequired
							orientation="horizontal"
							label="Select Account Type"
							value={accountType}
							onChange={handleAccountTypeChange}>
							<CustomRadio value="student">
								<img src={studentImage} alt="studentImage" width={60} />
								Students
							</CustomRadio>
							<CustomRadio value="teacher">
								<img src={teacherImage} alt="studentImage" width={60} />
								Teacher
							</CustomRadio>
							<CustomRadio value="admin">
								<img src={adminImage} alt="studentImage" width={60} />
								Admin
							</CustomRadio>
						</RadioGroup>
						<Button
							onClick={submitFormData}
							variant="solid"
							size="md"
							radius="sm"
							className="w-full bg-green-500 mt-2">
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
