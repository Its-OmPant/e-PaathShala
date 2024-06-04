import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { useSelector } from "react-redux";
// images
import studentImage from "../../assets/student.png";
import branchesImage from "../../assets/branches.png";
import courseImage from "../../assets/course.png";
import subjectImage from "../../assets/subject.png";

function StudentDashBoardTab() {
	const [dashboardData, setDashboardData] = useState();
	const user = useSelector((state) => state.auth.user);
	const getDashboardData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/student/dashboard`,
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
				<div className="flex  my-2">
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-red-300/70 py-4 rounded">
						<img src={courseImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Subjects</h3>
							<h2 className="text-lg font-bold">
								{dashboardData?.subjects || 0}
							</h2>
						</div>
					</div>
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-teal-300/70 py-4 rounded">
						<img src={subjectImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Resources</h3>
							<h2 className="text-lg font-bold">
								{dashboardData?.resource || 0}
							</h2>
						</div>
					</div>
				</div>

				<div className="flex gap-4 h-full mt-3 mx-2">
					<Card className="w-full ">
						<div className="flex justify-between px-4 py-2">
							<h2 className="font-semibold m-2 ">Attendance Analytics</h2>
						</div>
						<div className="flex items-end w-4/5 mx-auto ">
							<Bar
								data={{
									labels: [
										"Jan",
										"Feb",
										"Mar",
										"Apr",
										"May",
										"June",
										"Jul",
										"Aug",
										"Sep",
										"Oct",
										"Nov",
										"Dec",
									],
									datasets: [
										{
											label: "Total Attendance %",
											data: [78, 60, 88, 69, 57, 92, 78, 60, 88, 69, 57, 92],
											backgroundColor: "rgba(153, 131, 252,0.8)",
											borderRadius: 5,
											borderColor: "rgb(153, 131, 252)",
											borderWidth: 2,
										},
										{
											label: "Total Leaves %",
											data: [22, 40, 12, 31, 43, 8, 22, 40, 12, 31, 43, 8],
											backgroundColor: "rgba(255, 92, 184, 0.7)",
											borderRadius: 5,
											borderColor: "rgb(255, 92, 184)",
											borderWidth: 2,
										},
									],
								}}
							/>
						</div>
					</Card>
				</div>
			</CardBody>
		</Card>
	);
}

export default StudentDashBoardTab;
