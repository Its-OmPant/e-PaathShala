import React from "react";

import TabsNavbar from "./TabsNavbar.jsx";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Calendar } from "@nextui-org/calendar";

import { today, getLocalTimeZone } from "@internationalized/date";

function DashBoardTab() {
	return (
		<Card className="w-4/5 p-3">
			<TabsNavbar tabName="Dashboard" />
			<Divider></Divider>
			<CardBody>
				<div className="flex justify-around my-2">
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 border-1 border-black/80 py-4 rounded">
						<Avatar showFallback size="lg"></Avatar>
						<div className="text-center">
							<h3>Students</h3>
							<h2 className="text-lg font-bold">2000</h2>
						</div>
					</div>
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 border-1 border-black/80 py-4 rounded">
						<Avatar showFallback size="lg"></Avatar>
						<div className="text-center">
							<h3>Faculties</h3>
							<h2 className="text-lg font-bold">45</h2>
						</div>
					</div>
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 border-1 border-black/80 py-4 rounded">
						<Avatar showFallback size="lg"></Avatar>
						<div className="text-center">
							<h3>Courses</h3>
							<h2 className="text-lg font-bold">15</h2>
						</div>
					</div>
					<div className="p-2 w-1/4 mx-3 flex  justify-center gap-3 border-1 border-black/80 py-4 rounded">
						<Avatar showFallback size="lg"></Avatar>
						<div className="text-center">
							<h3>Staff</h3>
							<h2 className="text-lg font-bold">23</h2>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					{/* left  */}
					<div className="w-3/4">
						<h1>Dashboard</h1>
						<Card shadow="none" className="w-full h-96 my-3 bg-pink-100">
							hello
						</Card>
					</div>

					{/* right */}
					<div className="1/4 text-center">
						<h3>Events Calendar</h3>
						<Calendar
							isReadOnly={true}
							value={today(getLocalTimeZone())}
							className="my-3 mx-3 bg-yellow-100"></Calendar>
						<h3>Latest Notice</h3>
						<Card shadow="none" className="my-2 bg-sky-200/80 mx-3 py-2 px-4">
							<h2 className="font-bold text-slate-800">Notice Headline</h2>
							<p className="text-justify">notice description in short</p>
						</Card>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default DashBoardTab;
