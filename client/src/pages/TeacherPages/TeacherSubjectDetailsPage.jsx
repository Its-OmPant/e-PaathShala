import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
	Accordion,
	AccordionItem,
	Button,
	Input,
	Tooltip,
} from "@nextui-org/react";
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
import { MdArrowBack, MdRefresh } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";

import AboutImg from "../../assets/about.jpg";

function TeacherSubjectDetailsPage() {
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

	const [subjectDetails, setSubjectDetails] = useState();
	const [chapterDetails, setChapterDetails] = useState({
		chapterNo: 0,
		chapterName: "",
	});

	const [selectedLecture, setSelectedLecture] = useState(null);

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

	const handleInputChange = (e) => {
		setChapterDetails({ ...chapterDetails, [e.target.name]: e.target.value });
	};

	const createOrAddChapter = async () => {
		if (!chapterDetails.chapterName && !chapterDetails.chapterNo) {
			toast.error("All Fields are required", toastOptions);
			return;
		}
		if (chapterDetails.chapterNo <= 0) {
			toast.error("Chapter Number should be greater than 0", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/teacher/subjects/${subjectId}/chapters/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify(chapterDetails),
				}
			);

			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				toast.success(result.message, toastOptions);
				onClose();
			} else {
				const error = await response.json();
				onClose();
				return toast.error(error.message, toastOptions);
			}
			setChapterDetails({ chapterName: "", chapterNo: 0 });
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
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
					<Link to="/teacher/subjects">
						<MdArrowBack size={22} />
					</Link>
					<h1 className="font-semibold text-lg">Subject Details</h1>
				</div>
				<div className="flex gap-3">
					<Button color="warning" variant="solid" onClick={onOpen}>
						Create Chapters
					</Button>
					<Link to="lecture/add">
						<Button color="success" variant="solid">
							Add Lecture
						</Button>
					</Link>
					<Button color="secondary" variant="solid">
						Add Assignment
					</Button>
					<Tooltip content="Refresh">
						<Button color="danger" isIconOnly>
							<MdRefresh size="18" />
						</Button>
					</Tooltip>

					<Modal size="sm" isOpen={isOpen} onClose={onClose} backdrop="blur">
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Create/Add Chapters
									</ModalHeader>
									<ModalBody>
										<form action="" className="flex flex-col gap-3">
											<Input
												type="number"
												label="Enter Chapter No"
												color="secondary"
												name="chapterNo"
												isRequired
												value={chapterDetails.chapterNo}
												onChange={handleInputChange}
											/>
											<Input
												type="text"
												label="Enter Chapter Name"
												color="secondary"
												name="chapterName"
												isRequired
												value={chapterDetails.chapterName}
												onChange={handleInputChange}
											/>
										</form>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Cancel
										</Button>
										<Button color="secondary" onPress={createOrAddChapter}>
											Create
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody className="flex-row">
				{/* left div */}
				<div className="w-9/12">
					{selectedLecture ? (
						<div className="relative bg-slate-200 rounded-md">
							<button
								className="absolute top-2 right-2 z-10 bg-red-500 px-2 rounded-md text-white font-bold"
								onClick={() => {
									setSelectedLecture(null);
								}}>
								X
							</button>
							<video controls className="w-full h-[450px] rounded-md">
								<source src={selectedLecture?.fileUrl} />
							</video>
						</div>
					) : (
						<img
							src={subjectDetails?.coverImage || ""}
							className="w-full h-[450px] rounded-md"
						/>
					)}
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
														<div
															onClick={() => {
																setSelectedLecture(l);
															}}
															key={l._id}
															className="bg-slate-100 p-2 my-2  rounded-md hover:bg-slate-200">
															{`${l.lectureNo} ${
																l.lectureName || "Chapter name"
															}`}
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

export default TeacherSubjectDetailsPage;
