import React from "react";
import { Link } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Accordion, AccordionItem } from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";

import AboutImg from "../../assets/about.jpg";

function SubjectDetails() {
	const itemClasses = {
		base: "",
		title: "font-normal text-md",
		trigger: "py-0 h-12 flex items-center",
		indicator: "text-medium",
		content: "text-small",
	};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<div className="flex gap-3 items-center">
					<Link to="/admin/subjects">
						<MdArrowBack />
					</Link>
					<h1>Subject Details</h1>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody className="flex-row">
				{/* left div */}
				<div className="w-9/12 ">
					<img src={AboutImg} className="w-full h-[450px] rounded-md" />
					<div className="p-2">
						<div className="flex justify-between">
							<h1 className="text-lg font-bold">Subject Name</h1>
							<h2 className="font-semibold">Subject Code</h2>
						</div>
						<h3> Course : Course Name</h3>
						<h3> Branch : Branch Name</h3>
						<h3> Teacher : Teacher Name</h3>
					</div>
				</div>

				{/* right div */}
				<div className="w-3/12 mx-2 overflow-auto">
					<h1 className="bg-blue-100 text-lg p-2 rounded-md mb-2 text-center">
						Lectures
					</h1>
					<Accordion variant="splitted" itemClasses={itemClasses}>
						<AccordionItem key="1" aria-label="Accordion 1" title="Chapter 1">
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
						</AccordionItem>
						<AccordionItem key="2" aria-label="Accordion 2" title="Chapter 2">
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
						</AccordionItem>
						<AccordionItem key="3" aria-label="Accordion 3" title="Chapter 3">
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
							<div className="bg-slate-100 p-2 my-2  rounded-md">
								Video Name
							</div>
						</AccordionItem>
					</Accordion>
				</div>
			</CardBody>
		</Card>
	);
}

export default SubjectDetails;
