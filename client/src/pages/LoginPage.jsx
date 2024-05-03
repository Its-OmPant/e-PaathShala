import React from "react";
import { Link } from "react-router-dom";

// nextUI Components
import { Input, Button } from "@nextui-org/react";
import { RadioGroup, Radio, cn, Image } from "@nextui-org/react";

// Custom Components
import Navbar from "../components/Navbar";
import CustomRadio from "../components/CustomRadio";

// Images
import LoginImage from "../assets/login.jpg";

// icons
import { FaUserShield } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";

function LoginPage() {
	return (
		<div className="min-h-screen bg-slate-300 py-2">
			<Navbar />

			<div className="my-4 mx-8 flex justify-between bg-white rounded-md p-4 py-8">
				<div className="w-1/2">
					<h3 className="text-xl text-center font-bold text-slate-800 my-4">
						Login
					</h3>
					<Image src={LoginImage} alt="" className="w-4/5" />
				</div>
				<div className="w-1/2 ">
					<form action="" className="w-4/5 mx-auto">
						<Input
							color="primary"
							type="text"
							label="Username"
							isRequired
							description="Enter Your Fullname "
							className="my-4"
						/>
						<Input
							color="primary"
							type="email"
							label="Email"
							isRequired
							description="Enter Your Email ID "
							className="my-4"
						/>

						<Input
							color="primary"
							type="password"
							label="Password"
							isRequired
							description="Enter Your Password"
							className="my-4"
						/>

						<RadioGroup
							isRequired
							orientation="horizontal"
							label="Account Type"
							description="Select your account type">
							<CustomRadio value="student">
								<PiStudentFill size={32} />
								Student
							</CustomRadio>
							<CustomRadio value="faculty">
								<PiChalkboardTeacher size={32} />
								Faculty
							</CustomRadio>
							<CustomRadio value="admin">
								<FaUserShield size={32} />
								Admin
							</CustomRadio>
						</RadioGroup>

						<p className="text-md my-2 text-right text-slate-600">
							don't have an account{" "}
							<Link to="/register" className="text-blue-700 underline ">
								Register Now!
							</Link>
						</p>
						<Button
							type="submit"
							variant="solid"
							size="md"
							radius="sm"
							className="w-full bg-green-500 ">
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
