import React from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/react";

function NoticeTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Notices</h1>
				<div className="flex justify-end">
					<Button color="secondary">Create Notice</Button>
				</div>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				<div>
					<div className="my-2 px-4 py-1 bg-gray-200 hover:bg-gray-300/70 rounded-md ">
						<h2 className="font-bold text-lg">Notice Title</h2>
						<p>
							Notice Description Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Nesciunt maiores animi odit deserunt quidem
							doloribus quam temporibus ipsam dolor mollitia.
						</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default NoticeTab;
