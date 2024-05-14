import React from "react";

// redux related
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

function DashboardMain() {
	const user = useSelector((state) => state.auth.user);

	return (
		<Card className="w-4/5 bg-blue-200">
			<CardBody className="p-8 text-center justify-center">
				<h3 className="text-lg ">Welcome to</h3>
				<h2 className="text-4xl font-bold text-blue-900 my-4">E-PaathShala</h2>
				<h3 className="text-lg font-semibold">Internal Admin Dashboard</h3>
				<br />

				{user ? (
					<div></div>
				) : (
					<NavLink to="/internal/admin/login">
						<Button color="primary">Login</Button>
					</NavLink>
				)}
			</CardBody>
			<CardFooter className="justify-end">
				e-PaathShala version 1.0.0
			</CardFooter>
		</Card>
	);
}

export default DashboardMain;
