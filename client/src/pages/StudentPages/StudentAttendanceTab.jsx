import React from "react";

import { Card, CardBody, CardHeader } from "@nextui-org/react";

function StudentAttendanceTab() {
	return (
		<Card shadow="none" className="w-4/5 p-3 ">
			<CardHeader>Attendance</CardHeader>
			<CardBody> Student Attendance</CardBody>
		</Card>
	);
}

export default StudentAttendanceTab;
