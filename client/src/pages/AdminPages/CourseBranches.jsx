import React from "react";
import { Link } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider, Button } from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";

function CourseBranches() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3 justify-between">
				<div className="flex gap-4 items-center">
					<Link to="/admin/courses">
						<MdArrowBack size={22} />
					</Link>
					<h1>Course Details</h1>
				</div>
				<div className="flex justify-end gap-3">
					<Button color="secondary" isIconOnly>
						<MdOutlineRefresh size={18} />
					</Button>
					<Link to="branch/add">
						<Button color="warning" radius="sm">
							Add Branch
						</Button>
					</Link>
					<Link to="subject/add">
						<Button color="success" radius="sm">
							Add Subject
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardBody className="flex flex-row gap-3">
				{/* left Card */}
				<Card shadow="none" className="bg-slate-200 w-1/4 h-full">
					<CardBody>
						<Image
							width={300}
							alt="NextUI hero Image"
							src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
						/>
						<CardFooter className="flex-col items-start">
							<h2 className="text-center w-full font-bold">
								Bachelors Of Technology
							</h2>
							<p className="my-3">Available Branches</p>
							<div className="w-full pr-3 flex flex-col gap-3 overflow-auto overflow-x-hidden">
								<div className="p-3 rounded-md bg-white">Computer Science</div>
								<div className="p-3 rounded-md bg-white">Electrical</div>
								<div className="p-3 rounded-md bg-white">Mechanical</div>
							</div>
						</CardFooter>
					</CardBody>
				</Card>
				{/* Right Card */}
				<Card shadow="none" className="bg-slate-200 w-3/4">
					<CardBody>
						<h1 className="text-lg font-semibold text-center my-2">
							Computer Science Subjects
						</h1>
						<div className="grid grid-cols-3 gap-3 my-4">
							<div className="p-3 rounded-md bg-white">Compiler Design</div>
							<div className="p-3 rounded-md bg-white">Theory Of Autometa</div>
							<div className="p-3 rounded-md bg-white">C Programming</div>
							<div className="p-3 rounded-md bg-white">Logics with Python </div>
							<div className="p-3 rounded-md bg-white">Web Technologies </div>
						</div>
					</CardBody>
				</Card>
			</CardBody>
		</Card>
	);
}

export default CourseBranches;
