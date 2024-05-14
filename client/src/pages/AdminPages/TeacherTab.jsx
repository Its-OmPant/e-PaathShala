import React from "react";

import TabsNavbar from "./TabsNavbar.jsx";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

function TeacherTab() {
	return (
		<Card className="w-4/5 p-3">
			<TabsNavbar tabName="Teachers" />
			<Divider></Divider>
			<CardBody>Teachers</CardBody>
		</Card>
	);
}

export default TeacherTab;
