import React, { useEffect, useState } from "react";
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

function SubjectDetails() {
	const user = useSelector((state) => state.auth.user);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const itemClasses = {
		base: "p-2",
		title: "font-normal text-md",
		trigger: "py-0 h-12 flex items-center",
		indicator: "text-medium",
		content: "text-small",
	};

	const params = useParams();
	const subjectId = params.subjectId;

	const [allTeachers, setAllTeachers] = useState();

	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [subjectDetails, setSubjectDetails] = useState();

	const getAllTeacherNames = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/teachers/list`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				setAllTeachers(result.data);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	const handleTeacherSelect = (e) => {
		setSelectedTeacher(e.target.value);
	};

	const openModalAndGetTeachers = () => {
		getAllTeacherNames();
		onOpen();
	};

	const changeTeacher = async () => {
		if (!selectedTeacher) {
			toast.error("Teacher is required", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/subjects/${subjectId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ teacherId: selectedTeacher }),
				}
			);

			if (response.ok) {
				const result = await response.json();
				if (result.status) {
					toast.success("Teacher Changed Successfully", toastOptions);
				} else {
					throw result.message;
				}
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	const getSubjectDetails = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/subjects/${subjectId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				// console.log(result.data);
				setSubjectDetails(result.data);
			}
		} catch (error) {
			console.log("Custom Error :: ", error);
		}
	};

	useEffect(() => {
		getSubjectDetails();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<div className="flex gap-3 items-center">
					<Link to="/admin/subjects">
						<MdArrowBack size={22} />
					</Link>
					<h1 className="font-semibold text-lg">Subject Details</h1>
				</div>
				<Button
					color="secondary"
					variant="ghost"
					onClick={openModalAndGetTeachers}>
					Change Teacher
				</Button>
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
					<img
						src={subjectDetails?.coverImage || ""}
						className="w-full h-[450px] rounded-md"
					/>
					<div className="p-2">
						<div className="flex justify-between">
							<h1 className="text-lg font-bold">
								{subjectDetails?.name || "Subject Name"}
							</h1>
							<h2 className="font-semibold">
								{subjectDetails?.code || "Subject Code"}
							</h2>
						</div>
						<h3> Course : {subjectDetails?.course?.name || "Course Name"}</h3>
						<h3> Branch : {subjectDetails?.branch?.name || " Branch Name"}</h3>
						<h3>
							{" "}
							Teacher : {subjectDetails?.taughtBy?.fullName || "Teacher Name"}
						</h3>
					</div>
				</div>

				{/* right div */}
				<div className="w-3/12 mx-2 overflow-auto">
					<Tabs size="lg" color="primary">
						{/* Chapters Tab */}
						<Tab
							title={
								<div className="flex items-center space-x-2">
									<BiSolidVideos size="20" />
									<span>Lectures</span>
								</div>
							}>
							{subjectDetails?.content &&
							subjectDetails?.content?.length > 0 ? (
								<Accordion variant="splitted" itemClasses={itemClasses}>
									{subjectDetails?.content?.map((ch) => (
										<AccordionItem
											key={ch._id}
											aria-label="Accordion 1"
											title={`Chapter-${ch.chapterNo} ${ch.chapterName}`}>
											{ch.lectures?.length ? (
												<div>
													{ch.lectures.map((l) => (
														<div className="bg-slate-100 p-2 my-2  rounded-md">
															Video Name
														</div>
													))}
												</div>
											) : (
												<p className="my-2 text-red-500 text-center">
													No Lectures available
												</p>
											)}
										</AccordionItem>
									))}
								</Accordion>
							) : (
								<>
									<p className="text-center text-red-600 my-4">
										No Chapters Found
									</p>
									<p className="text-center ">
										Add Some using Create Chapters button in navbar
									</p>
								</>
							)}
						</Tab>
						{/* assignments tab */}
						<Tab
							title={
								<div className="flex items-center space-x-2">
									<FaFileAlt />
									<span>Assignments</span>
								</div>
							}>
							{subjectDetails?.content &&
							subjectDetails?.content?.length > 0 ? (
								<Accordion variant="splitted" itemClasses={itemClasses}>
									{subjectDetails?.content?.map((ch) => (
										<AccordionItem
											key={ch._id}
											title={`Chapter-${ch.chapterNo} ${ch.chapterName}`}>
											{ch.assignments?.length ? (
												<div>
													{ch.lectures.map((as) => (
														<div className="bg-slate-100 p-2 my-2  rounded-md">
															Assignment
														</div>
													))}
												</div>
											) : (
												<p className="my-2 text-red-500 text-center">
													No Assignment available
												</p>
											)}
										</AccordionItem>
									))}
								</Accordion>
							) : (
								<>
									<p className="text-center text-red-600 my-4">
										No Chapters Found
									</p>
									<p className="text-center ">
										Add Some using Create Chapters button in navbar
									</p>
								</>
							)}
						</Tab>
					</Tabs>
				</div>
			</CardBody>
		</Card>
	);
}

export default SubjectDetails;
