import React from "react";
import Navbar from "../components/Navbar";
import { Input, Textarea, Button } from "@nextui-org/react";
import ContactImage from "../assets/contact.png";

function ContactUsPage() {
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
						<Textarea
							color="primary"
							variant="flat"
							label="Description"
							isRequired
							description="Enter a concise description of your message/query."
							className="my-4"
						/>
						<Button
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
