import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar, Input } from "@nextui-org/react";

function StudentProfileTab() {
	const user = useSelector((state) => state.auth.user);

	const [studentDetails, setStudentDetails] = useState();

	const getStudentProfileDetails = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/student/profile`,
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
				// console.log(result);
				setStudentDetails(result.data);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getStudentProfileDetails();
	}, []);

	return (
		<Card className="w-4/5 p-3 ">
			<CardHeader>
				<h1 className="text-lg uppercase font-bold">Student Profile</h1>
			</CardHeader>
			<Divider />
			<CardBody>
				<Card shadow="none" className="w-3/5 mx-auto p-4">
					<CardHeader className="gap-6 justify-center flex-col">
						<Avatar
							src={studentDetails?.profileImage}
							alt=""
							className="w-[100px] h-[100px] bg-blue-100 text-blue-600"
						/>
						<div>
							<h1 className="text-xl font-bold text-center">
								{studentDetails?.fullName || "N/A"}
							</h1>
							<h2>{studentDetails?.email || "N/A"}</h2>
						</div>
					</CardHeader>
					<CardBody>
						<form action="">
							<div className="grid grid-cols-2 gap-4">
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Father's Name"
									value={studentDetails?.fatherName || "N/A"}
								/>
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Mother's Name"
									value={studentDetails?.motherName || "N/A"}
								/>
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Contact Number"
									value={studentDetails?.contactNo || "N/A"}
								/>
								<Input
									isReadOnly
									color="primary"
									label={"Birth date (dd/mm/yyyy)"}
									className="max-w-sm"
									value={
										new Date(
											studentDetails?.dateOfBirth
										).toLocaleDateString() || "N/A"
									}
								/>
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Course"
									value={studentDetails?.course.name || "N/A"}
								/>
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Branch"
									value={studentDetails?.branch.name || "N/A"}
								/>
							</div>
						</form>
					</CardBody>
				</Card>
			</CardBody>
		</Card>
	);
}

export default StudentProfileTab;
