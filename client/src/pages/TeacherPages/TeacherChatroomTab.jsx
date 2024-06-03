import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
} from "@nextui-org/react";

import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";
import NoFound from "../../assets/no_data.jpg";

import Image from "../../assets/f3.jpg";
function TeacherChatroomTab() {
	const user = useSelector((state) => state.auth.user);

	const [allChats, setAllChats] = useState([]);

	const getAllChats = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/chats/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				setAllChats(result.data);
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something unexpeceted Occured", toastOptions);
			console.log("Custom Error :: ", error);
		}
	};

	useEffect(() => {
		getAllChats();
	});
	return (
		<Card className="w-4/5 p-3">
			<CardHeader>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Chat Rooms tab
				</h1>
			</CardHeader>
			<CardBody>
				{allChats?.length > 0 ? (
					<div className="grid grid-cols-4 gap-4">
						{allChats.map((c) => (
							<Link to={`chat/${c._id}`} key={c._id}>
								<div className="bg-slate-200 p-2 rounded-md hover:scale-105 transition-all">
									<img
										src={c.coverImage}
										alt=""
										className="w-[280px] h-[170px] rounded-md"
									/>
									<div className="flex justify-between items-center px-2 py-1">
										<h1 className="mx-auto font-semibold text-md truncate">
											{c.chatName}
										</h1>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Courses Found</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				)}
			</CardBody>
		</Card>
	);
}

export default TeacherChatroomTab;
