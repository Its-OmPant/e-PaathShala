import React from "react";
import { Link } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";

import { MdArrowDropDown } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function StudentTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Students</h1>
				<div className="flex justify-end gap-3">
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant="solid"
								color="success"
								endContent={<MdArrowDropDown size="22" />}>
								Select Class
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							<DropdownItem key="new">New file</DropdownItem>
							<DropdownItem key="copy">Copy link</DropdownItem>
							<DropdownItem key="edit">Edit file</DropdownItem>
							<DropdownItem key="delete" className="text-danger" color="danger">
								Delete file
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Link to="add">
						<Button color="primary" radius="sm">
							Add New Student
						</Button>
					</Link>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				<table>
					<thead className="">
						<tr className="flex justify-between  p-2 bg-danger-100 rounded-lg">
							<td className="w-1/6">Name</td>
							<td className="w-1/6">Email</td>
							<td className="w-1/6">Contact No.</td>
							<td className="w-1/6">Course</td>
							<td className="w-1/6">Branch</td>
							<td className="w-1/6">Actions</td>
						</tr>
					</thead>
					<tbody>
						<tr className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
							<td className="w-1/6">Akshay Kumar</td>
							<td className="w-1/6">ak@gmail.com</td>
							<td className="w-1/6">+91 8759658424</td>
							<td className="w-1/6">B Tech </td>
							<td className="w-1/6">C.S.E </td>
							<td className="w-1/6">
								<button className="mx-1 bg-slate-500 text-white p-2 rounded-full">
									<FaRegEye />
								</button>
								<button className="mx-1 bg-blue-500 text-white p-2 rounded-full">
									<FaRegEdit />
								</button>
								<button className="mx-1 bg-pink-600 text-white p-2 rounded-full">
									<MdDeleteOutline />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}

export default StudentTab;
