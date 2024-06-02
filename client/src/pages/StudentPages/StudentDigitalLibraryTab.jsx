import React from "react";

import Resource from "../../components/Resource";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

function StudentDigitalLibraryTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Digital Library Tab
				</h1>
			</CardHeader>
			<CardBody>
				<div className="grid grid-cols-5">
					<Resource resName="Compiler Design Book" />
					<Resource resName="Theory Of Autometa Book" />
				</div>
			</CardBody>
		</Card>
	);
}

export default StudentDigitalLibraryTab;
