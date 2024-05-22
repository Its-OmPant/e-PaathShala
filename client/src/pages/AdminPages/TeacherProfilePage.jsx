import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// nextUI Components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";

// icons
import { MdArrowBack } from "react-icons/md";

function TeacherProfilePage() {
	const params = useParams();
	const teacherId = params.id;
	const [teacher, setTeacher] = useState();

	const getTeacherProfile = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/profile/${teacherId}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);

			console.log(response);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setTeacher(data.data);
			} else {
				const err = await response.json();
				console.log(err);
				return;
			}
		} catch (error) {
			console.log("customError :: ", error);
		}
	};

	useEffect(() => {
		getTeacherProfile();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/teachers">
					<MdArrowBack />
				</Link>
				<h1>Teacher Profile</h1>
			</CardHeader>
			<CardBody className="items-center">
				<div className="w-1/2 mt-16 bg-gray-100 shadow-md rounded-md p-4">
					<div className="flex justify-evenly items-center my-3">
						<Avatar
							src={teacher?.profileImage}
							fallback={<FaRegUser size={45} />}
							className="w-[140px] h-[140px] bg-blue-300"></Avatar>
						<div>
							<h2 className="text-2xl text-pink-800 font-bold">
								Name : {teacher?.fullName}
							</h2>
							<h3 className="text-lg text-slate-700">
								Email ID : {teacher?.email}
							</h3>
						</div>
					</div>
					<Input
						isReadOnly
						type="text"
						label="College"
						variant="bordered"
						value={teacher?.college.college}
					/>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Input
							isReadOnly
							type="text"
							label="Contact Number"
							variant="bordered"
							value={teacher?.contactNo}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Gender"
							variant="bordered"
							value={teacher?.gender}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Course Teaches"
							variant="bordered"
							value={
								teacher?.teachCourses.length !== 0
									? teacher?.teachCourses.map((c) => c.name)
									: "N/A"
							}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Subjects Teaches"
							variant="bordered"
							value={
								teacher?.teachSubjects.length !== 0
									? teacher?.teachSubjects.map((s) => s.name)
									: "N/A"
							}
							className="max-w-xs"
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherProfilePage;
