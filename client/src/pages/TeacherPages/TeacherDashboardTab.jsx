import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

// images
import studentImage from "../../assets/student.png";
import branchesImage from "../../assets/branches.png";
import courseImage from "../../assets/course.png";
import subjectImage from "../../assets/subject.png";

function TeacherDashboardTab() {
	const classes = [
		{ id: 1, label: "Class 1" },
		{ id: 2, label: "Class 2" },
		{ id: 3, label: "Class 3" },
		{ id: 4, label: "Class 4" },
	];
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">Dashboard</h1>
			</CardHeader>
			<CardBody>
				<div className="flex justify-around my-2">
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-purple-300/70 py-4 rounded">
						<img src={courseImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Courses</h3>
							<h2 className="text-lg font-bold">0</h2>
						</div>
					</div>

					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-yellow-300/70 py-4 rounded">
						<img src={branchesImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Branches</h3>
							<h2 className="text-lg font-bold">0</h2>
						</div>
					</div>

					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-red-300/70 py-4 rounded">
						<img src={subjectImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Subjects</h3>
							<h2 className="text-lg font-bold">0</h2>
						</div>
					</div>

					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 bg-teal-300/70 py-4 rounded ">
						<img src={studentImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3> Students</h3>
							<h2 className="text-lg font-bold">0</h2>
						</div>
					</div>
				</div>

				<div className="flex gap-4 h-full mt-3 mx-2">
					<Card className="w-1/2 ">
						<div className="flex justify-between px-4 py-2">
							<h2 className="font-semibold m-2 ">Attendance Analytics</h2>
							<Select
								color="secondary"
								size="sm"
								label="Select Class"
								className="w-[120px]">
								{classes.map((c) => (
									<SelectItem key={c.id}>{c.label}</SelectItem>
								))}
							</Select>
						</div>
						<div>
							<h2 className="text-center text-red-500 text-lg mt-28 ">
								Please Select a class{" "}
							</h2>
						</div>
					</Card>
					<Card className="w-1/2">
						<div className="flex justify-between px-4 py-2">
							<h2 className="font-semibold m-2 ">Result Analytics</h2>
							<Select
								color="warning"
								size="sm"
								label="Select Class"
								className="w-[120px]">
								{classes.map((c) => (
									<SelectItem key={c.id}>{c.label}</SelectItem>
								))}
							</Select>
						</div>
						<div>
							<h2 className="text-center text-red-500 text-lg mt-28 ">
								Please Select a class{" "}
							</h2>
						</div>
					</Card>
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherDashboardTab;
