import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar, Input } from "@nextui-org/react";

function TeacherProfileTab() {
	const user = useSelector((state) => state.auth.user);

	const [teacherDetails, setTeacherDetails] = useState();

	const getTeacherProfileDetails = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/profile`,
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
				setTeacherDetails(result.data);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getTeacherProfileDetails();
	}, []);

	return (
		<Card className="w-4/5 p-3 ">
			<CardHeader>
				<h1 className="text-lg uppercase font-bold">Student Profile</h1>
			</CardHeader>
			<Divider />
			<CardBody>
				<Card shadow="none" className="w-2/5 mx-auto p-4 mt-10">
					<CardHeader className="gap-6 justify-center flex-col">
						<Avatar
							src={teacherDetails?.profileImage}
							alt=""
							className="w-[100px] h-[100px] bg-blue-100 text-blue-600"
						/>
						<div>
							<h1 className="text-xl font-bold text-center">
								{teacherDetails?.fullName || "N/A"}
							</h1>
							<h2>{teacherDetails?.email || "N/A"}</h2>
						</div>
					</CardHeader>
					<CardBody>
						<form action="">
							<Input
								isReadOnly
								color="primary"
								type="text"
								label="College"
								value={teacherDetails?.college?.college || "N/A"}
							/>
							<div className="grid grid-cols-2 gap-4 my-4">
								<Input
									isReadOnly
									color="primary"
									type="text"
									label="Contact Number"
									value={teacherDetails?.contactNo || "N/A"}
								/>
								<Input
									isReadOnly
									color="primary"
									label={"Gender"}
									className="max-w-sm"
									value={teacherDetails?.gender}
								/>
							</div>
							<Input
								isReadOnly
								color="primary"
								type="text"
								label="Teach Courses"
								value={
									teacherDetails?.teachCourses?.length !== 0
										? teacherDetails?.teachCourses?.map((c) => c.name)
										: "N/A"
								}
							/>
						</form>
					</CardBody>
				</Card>
			</CardBody>
		</Card>
	);
}

export default TeacherProfileTab;
