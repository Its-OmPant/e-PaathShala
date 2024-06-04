import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

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

function StudentChatPage() {
	const user = useSelector((state) => state.auth.user);
	const params = useParams();
	const { chatId } = params;
	const navigate = useNavigate();

	const [isDivOpen, setIsDivOpen] = useState(false);

	const [chatDetails, setChatDetails] = useState();

	// states for messages
	const [messageInput, setMessageInput] = useState("");

	const [allMessages, setAllMessages] = useState([]);

	const sendMessage = async (e) => {
		e.preventDefault();

		if (!messageInput) {
			toast.error("please type a message", toastOptions);
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/chat/messages/new`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ chatId, content: messageInput }),
				}
			);
			console.log(response);
			if (response.ok) {
				const result = await response.json();
				setAllMessages([...allMessages, result.data]);
				setMessageInput("");
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	// fn to fetch all Messages
	const fetchAllMessages = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/chat/${chatId}/messages/all`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			if (response.ok) {
				const result = await response.json();
				// console.log(result.data);
				setAllMessages(result.data.chatMessages);
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	// fn to get chat details
	const getChatDetails = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/student/chats/${chatId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				// console.log(result.data);
				setChatDetails(result.data);
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something Unexpected Occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getChatDetails();
		fetchAllMessages();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<div className="flex gap-3 items-center">
					<MdArrowBack
						size={20}
						onClick={() => {
							navigate(-1);
						}}
					/>
					<h1 className="text-lg font-semibold uppercase tracking-wide">
						Chat Rooms tab
					</h1>
				</div>
			</CardHeader>
			<CardBody className="flex-row gap-2">
				{/* chat details */}
				<div className="bg-blue-100 w-1/4 h-full rounded-md">
					<img
						src={chatDetails?.coverImage || ""}
						alt=""
						className="w-full h-[200px] p-2"
					/>
					<h2 className="text-center font-semibold mx-2">
						{chatDetails?.chatName || "Chat group name"}
					</h2>
					<h2 className="text-center  mx-2">
						Admin : {chatDetails?.chatAdmin?.fullName || "Chat Admin name"}
					</h2>
					<div
						className="p-2 bg-white rounded-md m-2 flex flex-row justify-between items-center"
						onClick={(e) => setIsDivOpen(!isDivOpen)}>
						Participents : {chatDetails?.chatParticipents?.length}
						{isDivOpen ? (
							<IoIosArrowDropup size="18" />
						) : (
							<IoIosArrowDropdown size="18" />
						)}
					</div>
					{isDivOpen ? (
						<div className="bg-white m-2 rounded-md transition-all h-[240px] overflow-y-auto">
							{chatDetails.chatParticipents?.length > 0 ? (
								<div>
									{chatDetails.chatParticipents.map((user) => (
										<div
											className="p-2 m-2 flex flex-row gap-2 items-center text-sm"
											key={user._id}>
											<Avatar
												className="w-[25px] h-[25px] text-slate-800 bg-blue-100"
												src={user.profileImage || ""}
											/>
											<p>{user.fullName || "username"}</p>
										</div>
									))}
								</div>
							) : (
								<p className="text-center text-red-500">No Participents</p>
							)}
						</div>
					) : (
						<div></div>
					)}
				</div>
				{/* chats */}
				<div className="bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 w-3/4 h-full rounded-md relative overflow-y-auto">
					{allMessages?.length > 0 ? (
						<div className=" h-[480px] m-2 overflow-y-auto">
							{allMessages.map((msg) => (
								<div
									key={msg._id}
									className={` ${
										msg.senderId._id == user.id
											? "bg-green-200 rounded-3xl my-1 px-3 py-1 w-fit  float-right clear-both rounded-tr-none"
											: "bg-white rounded-2xl my-1 px-3 py-1 w-fit float-left clear-both  rounded-tl-none"
									}`}>
									{msg.senderId._id == user.id ? (
										""
									) : (
										<p className="text-xs w-fit">{msg.senderId.fullName}</p>
									)}
									<p className="w-fit">{msg.content}</p>
								</div>
							))}
						</div>
					) : (
						<div className="my-6 mx-auto px-2 bg-purple-300 w-[140px] text-center rounded-md">
							<p>no messages</p>
						</div>
					)}
					<div className="sticky bottom-2 left-0 right-0 h-[40px] m-2 rounded-xl">
						<input
							type="text"
							className="h-full w-[93%] bg-white mx-2 rounded-xl px-2 outline-none text-sm text-slate-800"
							placeholder="type your message"
							name="messageInput"
							value={messageInput}
							onChange={(e) => setMessageInput(e.target.value)}
						/>
						{messageInput?.length > 0 ? (
							<Button isIconOnly color="primary" onClick={sendMessage}>
								<IoSend />
							</Button>
						) : (
							<Button isDisabled isIconOnly color="primary">
								<IoSend />
							</Button>
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default StudentChatPage;
