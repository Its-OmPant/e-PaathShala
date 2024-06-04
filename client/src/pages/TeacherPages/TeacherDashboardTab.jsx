import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { useSelector } from "react-redux";

// images
import courseImage from "../../assets/course.png";
import subjectImage from "../../assets/subject.png";

function TeacherDashboardTab() {
	const [dashboardData, setDashboardData] = useState();
	const user = useSelector((state) => state.auth.user);
	const getDashboardData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/dashboard`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const res = await response.json();
				setDashboardData(res.data);
			}
		} catch (error) {
			console.log("Custom Error:: ", error);
		}
	};

	useEffect(() => {
		getDashboardData();
	}, []);
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">Dashboard</h1>
			</CardHeader>
			<CardBody>
				<div className="flex gap-2 my-2">
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-purple-300/70 py-4 rounded">
						<img src={courseImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Courses</h3>
							<h2 className="text-lg font-bold">
								{dashboardData?.courses || 0}
							</h2>
						</div>
					</div>

					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-red-300/70 py-4 rounded">
						<img src={subjectImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Subjects</h3>
							<h2 className="text-lg font-bold">
								{dashboardData?.subjects || 0}
							</h2>
						</div>
					</div>

					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 bg-teal-300/70 py-4 rounded ">
						<img src={subjectImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3> Resources</h3>
							<h2 className="text-lg font-bold">
								{dashboardData?.resource || 0}
							</h2>
						</div>
					</div>
				</div>

				<div className="flex gap-4 h-full mt-3 mx-2">
					<Card className="w-full ">
						<div className="flex flex-row justify-between p-2">
							<div className="flex justify-between px-4 py-2">
								<h2 className="font-semibold m-2 ">Attendance Analytics</h2>
							</div>
							<Select
								color="secondary"
								label="Select Month"
								className="max-w-xs">
								<SelectItem>January</SelectItem>
								<SelectItem>Februry</SelectItem>
								<SelectItem>March</SelectItem>
								<SelectItem>April</SelectItem>
								<SelectItem>May</SelectItem>
								<SelectItem>June</SelectItem>
								<SelectItem>July</SelectItem>
								<SelectItem>August</SelectItem>
								<SelectItem>September</SelectItem>
								<SelectItem>October</SelectItem>
								<SelectItem>November</SelectItem>
								<SelectItem>December</SelectItem>
							</Select>
						</div>
						<div className="flex justify-center items-end w-4/5 mx-auto py-2">
							<Bar
								data={{
									labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
									datasets: [
										{
											label: "Total Attendance %",
											data: [78, 60, 88, 69, 57, 92],
										},
										{
											label: "Boys %",
											data: [40, 20, 48, 35, 27, 40],
										},
										{
											label: "Girls %",
											data: [38, 40, 40, 34, 30, 52],
										},
									],
								}}
							/>
						</div>
					</Card>
					{/* <Card className="w-1/2">
						<div className="flex justify-between px-4 py-2">
							<h2 className="font-semibold m-2 ">Result Analytics</h2>
						</div>
					</Card> */}
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherDashboardTab;
