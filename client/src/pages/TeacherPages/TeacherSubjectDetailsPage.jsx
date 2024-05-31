import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";

import AboutImg from "../../assets/about.jpg";

function TeacherSubjectDetailsPage() {
	const user = useSelector((state) => state.auth.user);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const itemClasses = {
		base: "",
		title: "font-normal text-md",
		trigger: "py-0 h-12 flex items-center",
		indicator: "text-medium",
		content: "text-small",
	};

	const params = useParams();
	const subjectId = params.subjectId;

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<div className="flex gap-3 items-center">
					<Link to="/admin/subjects">
						<MdArrowBack size={22} />
					</Link>
					<h1 className="font-semibold text-lg">Subject Details</h1>
				</div>
				<div className="flex gap-3">
					<Button color="warning" variant="solid" onClick={onOpen}>
						Create Chapters
					</Button>
					<Button color="success" variant="solid" onClick={onOpen}>
						Add Lecture
					</Button>
				</div>
				<Modal
					size="md"
					isOpen={isOpen}
					onClose={onClose}
					isDismissable={false}
					backdrop="blur"
					scrollBehavior="inside"
					className="min-h-[220px]">
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Choose Subject Teacher
								</ModalHeader>
								<ModalBody>
									<Select
										name="teacherId"
										value={selectedTeacher}
										onChange={handleTeacherSelect}
										label={
											allTeachers?.length > 0
												? "Select a Teacher"
												: "No Teachers Found. Please add some before .."
										}>
										{allTeachers?.map((t) => (
											<SelectItem key={t._id} value={t._id}>
												{t.fullName}
											</SelectItem>
										))}
									</Select>
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Cancel
									</Button>
									<Button
										color="primary"
										onPress={() => {
											changeTeacher();
											onClose();
										}}>
										Change
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
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
					<Tabs size="lg" color="primary">
						<Tab
							title={
								<div className="flex items-center space-x-2">
									<BiSolidVideos size="20" />
									<span>Lectures</span>
								</div>
							}>
							<Accordion variant="splitted" itemClasses={itemClasses}>
								<AccordionItem
									key="1"
									aria-label="Accordion 1"
									title="Chapter 1">
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
								<AccordionItem
									key="2"
									aria-label="Accordion 2"
									title="Chapter 2">
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
								<AccordionItem
									key="3"
									aria-label="Accordion 3"
									title="Chapter 3">
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
						</Tab>
						<Tab
							title={
								<div className="flex items-center space-x-2">
									<FaFileAlt />
									<span>Assignments</span>
								</div>
							}>
							<Accordion variant="splitted" itemClasses={itemClasses}>
								<AccordionItem
									key="1"
									aria-label="Accordion 1"
									title="Chapter 1">
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment 1
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment 2
									</div>
								</AccordionItem>
								<AccordionItem
									key="2"
									aria-label="Accordion 2"
									title="Chapter 2">
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment
									</div>
								</AccordionItem>
								<AccordionItem
									key="3"
									aria-label="Accordion 3"
									title="Chapter 3">
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment 1
									</div>
									<div className="bg-slate-100 p-2 my-2  rounded-md">
										Assignment 2
									</div>
								</AccordionItem>
							</Accordion>
						</Tab>
					</Tabs>
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherSubjectDetailsPage;
