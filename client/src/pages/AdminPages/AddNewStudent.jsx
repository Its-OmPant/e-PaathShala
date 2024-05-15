import React from "react";
import { Link } from "react-router-dom";

import { Input, Button } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { MdArrowBack } from "react-icons/md";

function AddNewStudent() {
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
					<Input type="text" label="Full Name" color="primary"></Input>
					<Input type="email" label="Emai Id" color="primary"></Input>
					<Input type="text" label="Father's Name" color="primary"></Input>
					<Input type="text" label="Contact Number" color="primary"></Input>
					<Input type="text" label="Class" color="primary"></Input>
					<Button color="primary" className="my-4 rounded">
						Create
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}

export default AddNewStudent;
