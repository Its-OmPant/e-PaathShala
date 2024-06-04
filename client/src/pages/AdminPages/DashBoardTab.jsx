import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Calendar } from "@nextui-org/calendar";

// images
import studentImage from "../../assets/student.png";
import teacherImage from "../../assets/teacher.png";
import courseImage from "../../assets/course.png";
import subjectImage from "../../assets/subject.png";

import { today, getLocalTimeZone } from "@internationalized/date";

function DashBoardTab() {
	const user = useSelector((state) => state.auth.user);

	const [totalStudents, setTotalStudents] = useState();
	const [totalTeachers, setTotalTeachers] = useState();
	const [totalCourses, setTotalCourses] = useState();
	const [totalSubjects, setTotalSubjects] = useState();

	const getStudentCount = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/students/count`,
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
				setTotalStudents(result.data);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};
	const getCoursesCount = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/courses/count`,
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
				setTotalCourses(result.data);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};
	const getSubjectsCount = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/subjects/count`,
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
				setTotalSubjects(result.data);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};
	const getTeachersCount = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/teachers/count`,
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
				setTotalTeachers(result.data);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getStudentCount();
		getCoursesCount();
		getTeachersCount();
		getSubjectsCount();
	}, []);

	return (
		<Card shadow="none" className="w-4/5 p-3 ">
			<CardHeader>
				<h1 className="font-bold uppercase">Dashboard</h1>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				<div className="flex justify-around my-2">
					<Link
						to="/admin/students"
						className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-purple-300/70 py-4 rounded">
						<img src={studentImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Students</h3>
							<h2 className="text-lg font-bold">{totalStudents || "N/A"}</h2>
						</div>
					</Link>

					<Link
						to="/admin/teachers"
						className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-green-300/70 py-4 rounded">
						<img src={teacherImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Faculties</h3>
							<h2 className="text-lg font-bold">{totalTeachers || "N/A"}</h2>
						</div>
					</Link>

					<Link
						to="/admin/courses"
						className="p-2 w-1/4 mx-3 flex  justify-center gap-3  bg-red-300/70 py-4 rounded">
						<img src={courseImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3>Courses</h3>
							<h2 className="text-lg font-bold">{totalCourses || "N/A"}</h2>
						</div>
					</Link>

					<Link
						to="/admin/subjects"
						className="p-2 w-1/4 mx-3 flex  justify-center gap-3 bg-teal-300/70 py-4 rounded ">
						<img src={subjectImage} alt="" className="w-[80px] h-[80px]" />
						<div className="flex flex-col justify-center items-center">
							<h3> Subjects</h3>
							<h2 className="text-lg font-bold">{totalSubjects || "N/A"}</h2>
						</div>
					</Link>
				</div>

				<div className="flex gap-2">
					{/* left  */}
					<div className="w-3/4">
						<h3 className="text-lg font-semibold my-2">Attendance Report</h3>
						<Card shadow="none" className="w-full h-96 my-3 bg-slate-100">
							<div className="w-[90%] mx-auto">
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

					{/* right */}
					<div className="1/4 text-center">
						<h3 className="text-lg font-semibold my-2">Events Calendar</h3>
						<Calendar
							isReadOnly={true}
							value={today(getLocalTimeZone())}
							className="mt-1 mx-3 bg-yellow-100"></Calendar>
						<h3>Latest Notice</h3>
						<Card shadow="none" className="my-2 bg-sky-200/80 mx-3 py-2 px-4">
							<h2 className="font-bold text-slate-800">Notice Headline</h2>
							<p className="text-justify">notice description in short</p>
						</Card>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default DashBoardTab;
