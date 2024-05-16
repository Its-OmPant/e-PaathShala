import React from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

function CourseTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="font-bold uppercase">Courses</h1>
			</CardHeader>
			<Divider></Divider>
			<CardBody>Courses</CardBody>
		</Card>
	);
}

export default CourseTab;
