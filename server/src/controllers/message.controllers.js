import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createNewMessage = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		return res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const chat = await Chat.findById(chatId);

	if (!chat) {
		return res
			.status(400)
			.json(new ApiError(400, "Invalid Chat ID Chat doesn't exist"));
	}

	let senderType;

	if (user_role == "student") {
		senderType = "student";
	} else if (user_role == "teacher") {
		senderType = "teacher";
	}

	//todo: validate the given teacher/student id and chek if they have access to send message

	const message = await Message.create({
		chatId,
		content,
		senderId: user_id,
		senderType,
	});

	if (!message) {
		return res
			.status(500)
			.json(new ApiError(500, "Message not created !! Server Error"));
	}

	chat.chatMessages.push(message);
	await chat.save();

	const msgToReturn = await Message.findById(message._id)
		.select("content senderId senderType")
		.populate({
			path: "senderId",
			select: "fullName",
		});
	return res
		.status(200)
		.json(new ApiResponse(400, msgToReturn, "Message Created Successfully"));
});

const fetchAllMessages = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	const { chatId } = req.params;

	if (!user_role == "student" || !user_role == "teacher") {
		return res
			.status(400)
			.json(new ApiError("You are not authorized to access messages"));
	}

	const chatMessages = await Chat.findById(chatId)
		.select("chatMessages")
		.populate({
			path: "chatMessages",
			select: "senderId content senderType",
			populate: { path: "senderId", select: "fullName" },
		});

	if (!chatMessages) {
		return res
			.status(500)
			.json(new ApiError(500, "Message Fetching Failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, chatMessages, "Messages fetched successfully"));
});

export { createNewMessage, fetchAllMessages };
