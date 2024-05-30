import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

function TeacherAttendanceTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Attendance Tab
				</h1>
			</CardHeader>
			<CardBody>All Attendances</CardBody>
		</Card>
	);
}

export default TeacherAttendanceTab;
