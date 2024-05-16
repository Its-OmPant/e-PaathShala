import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Input, Textarea, Button } from "@nextui-org/react";
import ContactImage from "../assets/contact.png";

import { toast } from "react-toastify";
import { toastOptions } from "../Constants.js";

function ContactUsPage() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		description: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitForm = async (e) => {
		e.preventDefault();

		if (!formData.fullName || !formData.email || !formData.description) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		// hitting API
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/contact/add`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const data = await response.json();
				toast.success(data.message, toastOptions);
				setFormData({
					fullName: "",
					email: "",
					description: "",
				});
			} else {
				const errData = await response.json();
				toast.error(errData.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	return (
		<div className="min-h-screen bg-slate-300 py-2">
			<Navbar />

			<div className="my-4 mx-8 flex justify-between bg-white rounded-md p-4 py-10">
				<div className="w-1/2 ">
					<h3 className="text-lg text-center text-slate-700">
						Feel Free to reach out to us we're always here to help !
					</h3>
					<form action="" className="w-4/5 mx-auto">
						<Input
							color="primary"
							type="text"
							label="Your Full Name"
							isRequired
							description="Enter Your Fullname "
							className="my-4"
							name="fullName"
							value={formData.fullName}
							onChange={handleInputChange}
						/>
						<Input
							color="primary"
							type="email"
							label="Your Email ID"
							isRequired
							description="Enter Your Email ID "
							className="my-4"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
						/>
						<Textarea
							color="primary"
							variant="flat"
							label="Message / Query"
							isRequired
							description="Enter a concise description of your message/query."
							className="my-4"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
						/>
						<Button
							onClick={submitForm}
							variant="solid"
							size="md"
							radius="sm"
							className="w-full bg-teal-500 text-lg">
							Submit
						</Button>
					</form>
				</div>
				<div className="w-1/2">
					<img src={ContactImage} alt="" />
				</div>
			</div>
		</div>
	);
}

export default ContactUsPage;
