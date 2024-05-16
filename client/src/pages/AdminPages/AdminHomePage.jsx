import React from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

function AdminHomePage() {
	return (
		<Card className="w-4/5 bg-white">
			<CardBody className="p-8 text-center justify-center">
				<h3 className="text-lg ">Welcome to</h3>
				<h2 className="text-6xl font-bold text-blue-900 my-4">e-PaathShala</h2>
				<h3 className="text-xl text-pink-500 font-semibold">
					{" "}
					Admin Dashboard
				</h3>
			</CardBody>
			<CardFooter className="justify-end">
				e-PaathShala version 1.0.0
			</CardFooter>
		</Card>
	);
}

export default AdminHomePage;
