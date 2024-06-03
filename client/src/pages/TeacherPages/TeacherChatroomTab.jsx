import React from "react";
import { Link } from "react-router-dom";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
} from "@nextui-org/react";

import Image from "../../assets/f3.jpg";
function TeacherChatroomTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Chat Rooms tab
				</h1>
			</CardHeader>
			<CardBody>
				<div className="grid grid-cols-4 gap-4">
					<Link to="chat/12312">
						<div className="bg-slate-200 p-2 rounded-md hover:scale-105 transition-all">
							<img
								src={Image}
								alt=""
								className="w-[280px] h-[170px] rounded-md"
							/>
							<div className="flex justify-between items-center px-2 py-1">
								<h1 className="mx-auto font-semibold text-md truncate">
									C Programming Group
								</h1>
							</div>
						</div>
					</Link>
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherChatroomTab;
