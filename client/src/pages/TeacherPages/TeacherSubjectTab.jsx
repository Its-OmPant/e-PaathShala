import React from "react";
import { Link } from "react-router-dom";

import SubjectCard from "../../components/SubjectCard";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

function TeacherSubjectTab() {
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
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Subjects Tab
				</h1>
			</CardHeader>
			<CardBody className="grid grid-cols-4 gap-4">
				<Link to="subjectDetails">
					<SubjectCard
						coverImageUrl={s.coverImage}
						subjectName={s.name}
						subjectCode={s.code}
						courseName={s.course.name}
						branchName={s.branch.name}
						teacherName={s.taughtBy?.fullName || "N/A"}
					/>
				</Link>
			</CardBody>
		</Card>
	);
}

export default TeacherSubjectTab;
