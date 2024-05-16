import React from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/react";

function DigitalLibraryTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Digital Library</h1>
				<div className="flex justify-end">
					<Button color="secondary">Add Resourse</Button>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				<div className="grid grid-cols-5">
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
					<div className="m-2 px-4 p-3 bg-pink-200 rounded-md ">
						<div className="h-32 bg-white rounded-md w-full"></div>
						<h2 className="mt-2 text-center text-md">Resource Name</h2>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default DigitalLibraryTab;
