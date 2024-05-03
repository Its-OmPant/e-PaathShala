import React from "react";
import { Link } from "react-router-dom";

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
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
					/>
					<Input
						size="sm"
						type="text"
						label="School Name"
						color="primary"
						className="w-full my-4"
						isRequired
					/>
					<Input
						size="sm"
						type="email"
						label="Email ID "
						color="primary"
						className="w-full my-4"
						isRequired
					/>
					<Input
						size="sm"
						type="password"
						label="Password "
						color="primary"
						className="w-full my-4"
						isRequired
					/>
					<Input
						size="sm"
						type="password"
						label="Confirm Password "
						color="primary"
						className="w-full my-4"
						isRequired
					/>
					<CheckboxGroup
						className="mt-6"
						orientation="horizontal"
						color="secondary"
						defaultValue={["buenos-aires", "san-francisco"]}>
						<Checkbox value="remember-me">Remember Me</Checkbox>
						<Checkbox value="agree-to-TnC">
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
						type="submit"
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
