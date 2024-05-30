import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SubjectCard from "../../components/SubjectCard";

import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import NoFound from "../../assets/no_data.jpg";

function SubjectsTab() {
	const user = useSelector((state) => state.auth.user);

	const [subjects, setSubjects] = useState([]);

	const getAllSubjects = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/subjects/all`,
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
				setSubjects(result.data);
			} else {
				const err = await response.json();
				console.log(err.message);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getAllSubjects();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="font-bold uppercase">All Subjects</h1>
			</CardHeader>
			<Divider></Divider>
			{subjects && subjects.length > 0 ? (
				<CardBody className="grid grid-cols-4 gap-4">
					{subjects.map((s) => (
						<Link to={s._id} key={s._id}>
							<SubjectCard
								coverImageUrl={s.coverImage}
								subjectName={s.name}
								subjectCode={s.code}
								courseName={s.course.name}
								branchName={s.branch.name}
								teacherName={s.taughtBy?.fullName || "N/A"}
							/>
						</Link>
					))}
				</CardBody>
			) : (
				<div className="flex flex-col justify-center h-full items-center">
					<h2 className="text-2xl text-danger-600 font-bold">
						No Subjects found
					</h2>
					<img src={NoFound} width={300} alt="No Data Available" />
				</div>
			)}
		</Card>
	);
}

export default SubjectsTab;
