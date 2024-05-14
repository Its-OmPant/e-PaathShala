import React from "react";

import TabsNavbar from "./TabsNavbar.jsx";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

function CourseTab() {
	return (
		<Card className="w-4/5 p-3">
			<TabsNavbar tabName="Courses" />
			<Divider></Divider>
			<CardBody>Courses</CardBody>
		</Card>
	);
}

export default CourseTab;
