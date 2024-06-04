import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

import { useChatScroll } from "../../hooks/chatScrollHook.js";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Button,
} from "@nextui-org/react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";

// icons
import { MdArrowBack } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { IoSend } from "react-icons/io5";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
var socket;

function TeacherChatPage() {
	const user = useSelector((state) => state.auth.user);
	const params = useParams();
	const { chatId } = params;
	const navigate = useNavigate();

	const [socketConnected, setSocketConnected] = useState(false);

	const [isDivOpen, setIsDivOpen] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [chatDetails, setChatDetails] = useState();

	// states for messages
	const [messageInput, setMessageInput] = useState("");

	const [allMessages, setAllMessages] = useState([]);

	const ref = useChatScroll(allMessages); //for scrolling effect

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
				socket.emit("new_message", result.data);
				setMessageInput("");
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	// // fn to fetch all Messages
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

			socket.emit("join_chat", chatId);
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	// fn to get chat details
	const getChatDetails = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/chats/${chatId}`,
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

	// fn to add students to chat group
	const autoAddStudents = async () => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/teacher/chats/${chatId}/autoAddStudents`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			console.log(response);
			if (response.ok) {
				const result = await response.json();
				if (result?.data?.studentAdded > 0) {
					getChatDetails();
					toast.success(result.message, toastOptions);
				} else {
					toast.success("No new students added", toastOptions);
				}
			} else {
				const err = await response.json();
				toast.error(err.message, toastOptions);
			}
		} catch (error) {
			toast.error("Something unexpected occured", toastOptions);
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit("configure", user);
		socket.on("connection", () => setSocketConnected(true));
	}, []);

	useEffect(() => {
		socket.on("new_message_receieved", (msg) => {
			if (!chatId || chatId != msg.chatId._id) {
				// show notifications
			} else {
				setAllMessages([...allMessages, msg]);
			}
		});
	});

	useEffect(() => {
		fetchAllMessages();
		getChatDetails();
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
				<Button color="secondary" onClick={onOpen}>
					Add Participents
				</Button>
				<Modal
					isDismissable={false}
					backdrop="blur"
					isOpen={isOpen}
					onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									Add Participents
								</ModalHeader>
								<ModalBody>
									<Tabs aria-label="Options" fullWidth>
										<Tab key="autoDetect" title="Auto Detect">
											<Card>
												<CardBody>
													Auto Detect Feature will detect if there are any new
													students added in the branch and adds them
													automatically to the chat
												</CardBody>
											</Card>
											<div className="flex justify-end gap-3 my-4">
												<Button
													color="danger"
													variant="light"
													onPress={onClose}>
													Close
												</Button>
												<Button
													color="primary"
													onPress={() => {
														autoAddStudents();
														onClose();
													}}>
													Done
												</Button>
											</div>
										</Tab>
										<Tab key="addManually" title="Add Manually">
											<Card>
												<CardBody>
													This feature will be available very soon
												</CardBody>
											</Card>
											<div className="flex justify-end gap-3 my-4">
												<Button
													color="danger"
													variant="light"
													onPress={onClose}>
													Close
												</Button>
												<Button isDisabled color="primary" onPress={onClose}>
													Done
												</Button>
											</div>
										</Tab>
									</Tabs>
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
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
						<div ref={ref} className=" h-[480px] m-2 overflow-y-auto">
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
						<div className="my-6 mx-auto  h-[450px] text-center rounded-md">
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

export default TeacherChatPage;
