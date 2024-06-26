import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// redux related
import { useDispatch } from "react-redux";

// slice actions
import { setLoggedInUser } from "../../features/auth/authSlice.js";

// NextUI Components
import { Input, Button } from "@nextui-org/react";

function InternalAdminLoginPage() {
	const dispatch = useDispatch();
	const navigator = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password || !formData.confirmPassword) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Password do not match", toastOptions);
			return;
		}

		// hitting the Api
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/internal/admin/login`,
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
				dispatch(setLoggedInUser(data.data));
				navigator("/internal/admin/dashboard");
			} else {
				const errorData = await response.json();
				return toast.error(errorData.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};
	return (
		<div className="w-screen h-screen flex justify-between">
			{/* left */}
			<div className="w-2/5 bg-purple-800 flex flex-col items-center gap-4 justify-center">
				<h2 className="text-4xl text-white font-bold px-4 text-center">
					ePaathShala <br /> Internal Admin Login Page
				</h2>
			</div>

			{/* right */}
			<div className="w-3/5 flex justify-center items-center p-4">
				<form action="" className="w-3/5 ">
					<Input
						size="sm"
						type="email"
						label="Email ID "
						color="default"
						className="w-full my-4"
						isRequired
						name="email"
						value={formData.email}
						onChange={handleInputChange}
					/>
					<Input
						size="sm"
						type="password"
						label="Password "
						color="default"
						className="w-full my-4"
						isRequired
						name="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
					<Input
						size="sm"
						type="password"
						label="Confirm Password "
						color="default"
						className="w-full my-4"
						isRequired
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleInputChange}
					/>

					<Button
						onClick={login}
						color="secondary"
						varient="solid"
						radius="sm"
						className="my-6 w-full">
						Login{" "}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default InternalAdminLoginPage;
