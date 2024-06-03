import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Button,
} from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { IoSend } from "react-icons/io5";

import Image from "../../assets/f3.jpg";

function TeacherChatPage() {
	const [isDivOpen, setIsDivOpen] = useState(false);

	const navigate = useNavigate();
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<MdArrowBack
					size={20}
					onClick={() => {
						navigate(-1);
					}}
				/>
				<h1 className="text-lg font-semibold uppercase tracking-wide">
					Chat Rooms tab
				</h1>
			</CardHeader>
			<CardBody className="flex-row gap-2">
				{/* chat details */}
				<div className="bg-blue-100 w-1/4 h-full rounded-md">
					<img src={Image} alt="" className="w-full h-[200px] p-2" />
					<h2 className="text-center font-semibold">Chat Group Name</h2>
					<div
						className="p-2 bg-white rounded-md m-2 flex flex-row justify-between items-center"
						onClick={(e) => setIsDivOpen(!isDivOpen)}>
						Participents
						{isDivOpen ? (
							<IoIosArrowDropup size="18" />
						) : (
							<IoIosArrowDropdown size="18" />
						)}
					</div>
					{isDivOpen ? (
						<div className="bg-white m-2 rounded-md transition-all h-[280px] overflow-y-auto">
							<div className="p-2 m-2 flex flex-row gap-2 items-center  text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
							<div className="p-2 m-2 flex flex-row gap-2 items-center text-sm">
								<Avatar className="w-[20px] h-[20px]" />
								<p>Lorem Ipsum</p>
							</div>
						</div>
					) : (
						<div></div>
					)}
				</div>
				{/* chats */}
				<div className="bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 w-3/4 h-full rounded-md relative">
					<div className=" absolute bottom-0 left-0  right-0 h-[40px] m-2 rounded-xl">
						<input
							type="text"
							className="h-full w-[93%] bg-white mx-2 rounded-xl px-2 outline-none"
							placeholder="type your message"
						/>
						<Button isIconOnly color="primary">
							<IoSend />
						</Button>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default TeacherChatPage;
