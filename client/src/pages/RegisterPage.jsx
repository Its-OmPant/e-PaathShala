import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// NextUI Components
import { Input, Button } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";

// Images
import RegisterImage from "../assets/register.svg";

function RegisterPage() {
	const toastOptions = {
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const navigator = useNavigate();

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		schoolName: "",
		password: "",
		confirmPassword: "",
	});

	const [tnc, setTnc] = useState(false);

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const submitFormData = async (e) => {
		e.preventDefault();
		if (
			!formData.fullName ||
			!formData.email ||
			!formData.schoolName ||
			!formData.password ||
			!formData.confirmPassword
		) {
			toast.error("All Fields are required!", toastOptions);
			return;
		}

		if (!tnc) {
			toast.error("Agree to Terms and Conditions", toastOptions);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Password do not match", toastOptions);
			return;
		}

		// hitting the API
		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/admin/register",
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
				toast.success(
					data?.message || "Admin Created Successfully",
					toastOptions
				);
				navigator("/login");
			} else {
				const errData = await response.json();
				toast.error(errData.message, toastOptions);
				throw "Can't Register, Some Error Occured";
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("Error :: ", error);
		}
	};

	const toggleCheckbox = (e) => {
		setTnc(e.target.checked);
	};

	return (
		<div className="w-screen h-screen flex justify-between">
			{/* left */}
			<div className="w-3/5 flex justify-center items-center p-4">
				<form action="" className="w-3/5 ">
					<Input
						size="sm"
						type="text"
						label="Admin Name"
						color="primary"
						className="w-full my-4"
						isRequired
						name="fullName"
						value={formData.fullName}
						onChange={handleInput}
					/>
					<Input
						size="sm"
						type="text"
						label="School Name"
						color="primary"
						className="w-full my-4"
						isRequired
						name="schoolName"
						value={formData.schoolName}
						onChange={handleInput}
					/>
					<Input
						size="sm"
						type="email"
						label="Email ID "
						color="primary"
						className="w-full my-4"
						isRequired
						name="email"
						value={formData.email}
						onChange={handleInput}
					/>
					<Input
						size="sm"
						type="password"
						label="Password "
						color="primary"
						className="w-full my-4"
						isRequired
						name="password"
						value={formData.password}
						onChange={handleInput}
					/>
					<Input
						size="sm"
						type="password"
						label="Confirm Password "
						color="primary"
						className="w-full my-4"
						isRequired
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleInput}
					/>

					<CheckboxGroup
						className="mt-6"
						orientation="horizontal"
						color="secondary"
						defaultValue={[false, false]}>
						<Checkbox value="remember-me">Remember Me</Checkbox>
						<Checkbox name="tnc" onChange={toggleCheckbox}>
							Agree to{" "}
							<Link
								onClick={onOpen}
								varient="light"
								className="text-blue-700 underline">
								Terms and Conditions
							</Link>
							<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
								<ModalContent>
									{(onClose) => (
										<>
											<ModalHeader className="flex flex-col gap-1 text-red-800">
												Terms And Conditions
											</ModalHeader>
											<ModalBody>
												<p>
													1) Lorem ipsum dolor sit amet, consectetur adipisicing
													elit.
												</p>
												<p>
													2) Lorem ipsum dolor sit amet consectetur adipisicing
													elit. Possimus vitae omnis quae!
												</p>
												<p>
													3) Lorem, ipsum dolor sit amet consectetur adipisicing
													elit. Soluta, ipsa temporibus eius dicta sint nemo.
												</p>
												<p>
													4) . Soluta, ipsa temporibus eius dicta sint nemo.
												</p>
												<p>
													5) . Soluta, ipsa temporibus eius dicta sint nemo.
													Lorem, ipsum dolor.
												</p>
												<p>
													6) . Lorem ipsum dolor sit amet.Soluta, ipsa
													temporibus eius dicta sint nemo.
												</p>
											</ModalBody>
											<ModalFooter>
												<Button
													color="danger"
													variant="light"
													onPress={onClose}>
													Dismiss
												</Button>
												<Button color="primary" onPress={onClose}>
													Agree
												</Button>
											</ModalFooter>
										</>
									)}
								</ModalContent>
							</Modal>
						</Checkbox>
					</CheckboxGroup>

					<Button
						onClick={submitFormData}
						color="primary"
						varient="solid"
						radius="sm"
						className="my-6 w-full">
						Register{" "}
					</Button>
				</form>
			</div>
			{/* right */}
			<div className="w-2/5 bg-sky-800 flex flex-col items-center gap-4 justify-center">
				<h2 className="text-3xl text-white font-bold">Admin Registration </h2>
				<h3 className="text-white/85 mb-16">
					Create your own school / college account by registering as an admin
				</h3>
				<img src={RegisterImage} alt="Registration Image" className="w-4/5" />
				<p className="text-white px-3 text-sm text-center text-white/80 absolute bottom-5">
					Note: registrations / sign up is for admin only If you are a Student /
					Faculty,Login with your creadentials provided by college
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
