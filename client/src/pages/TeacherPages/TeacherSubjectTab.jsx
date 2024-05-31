import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// redux related
import { useSelector } from "react-redux";

// next ui components
import SubjectCard from "../../components/SubjectCard";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import NoFound from "../../assets/no_data.jpg";

function TeacherSubjectTab() {
	const user = useSelector((state) => state.auth.user);

	const s = {
		coverImage: "",
		name: "Demo Subject",
		code: "DEMO520",
		course: {
			name: "Demo Course",
		},
		branch: {
			name: "Demo Branch",
		},
		taughtBy: {
			fullName: "Demo Teacher",
		},
	};

	const [allSubjects, setAllSubjects] = useState();

	const getAllSubjcts = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/subjects/all`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				setAllSubjects(result.data);
			}
		} catch (error) {
			console.log("Custom Error:: ", error);
		}
	};

	useEffect(() => {
		getAllSubjcts();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Subjects Tab
				</h1>
			</CardHeader>
			{allSubjects?.length > 0 ? (
				<CardBody className="grid grid-cols-4 gap-4">
					{allSubjects.map((s) => (
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
				<CardBody>
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Data Available</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				</CardBody>
			)}
		</Card>
	);
}

export default TeacherSubjectTab;
