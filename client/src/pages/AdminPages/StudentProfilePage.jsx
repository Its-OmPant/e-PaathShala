import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// nextUI Components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";

// icons
import { MdArrowBack } from "react-icons/md";

function StudentProfilePage() {
	const params = useParams();
	const studentId = params.id;
	const [student, setStudent] = useState();

	const getStudentProfile = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/student/profile/${studentId}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				setStudent(data.data);
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
		getStudentProfile();
	}, []);
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin/students">
					<MdArrowBack />
				</Link>
				<h1>Student Profile</h1>
			</CardHeader>
			<CardBody className="items-center">
				<div className="w-1/2 mt-16 bg-gray-100 shadow-md rounded-md p-4">
					<div className="flex justify-evenly items-center">
						<Avatar
							src={student?.profileImage}
							fallback={<FaRegUser size={45} />}
							className="w-[140px] h-[140px] bg-blue-300"></Avatar>
						<div>
							<h2 className="text-2xl text-pink-800 font-bold">
								Name : {student?.fullName}
							</h2>
							<h3 className="text-lg text-slate-700">
								Email ID : {student?.email}
							</h3>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 my-4">
						<Input
							isReadOnly
							type="text"
							label="Father's Name"
							variant="bordered"
							value={student?.fatherName || "N/A"}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Mother's Name"
							variant="bordered"
							value={student?.motherName || "N/A"}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Contact Number"
							variant="bordered"
							value={student?.contactNo}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Gender"
							variant="bordered"
							value={student?.gender}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Course"
							variant="bordered"
							value={student?.course.name}
							className="max-w-xs"
						/>
						<Input
							isReadOnly
							type="text"
							label="Branch"
							variant="bordered"
							value={student?.branch.name}
							className="max-w-xs"
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default StudentProfilePage;
