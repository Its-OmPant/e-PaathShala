import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		chatName: {
			type: String,
			required: true,
		},
		chatAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "teacher",
			required: true,
		},
		chatParticipents: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "student",
			},
		],
		chatMessages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "message",
			},
		],
		coverImage: {
			type: String,
			required: true,
		},
		subject: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "subject",
		},
		college: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "admin",
		},
	},
	{
		timestamps: true,
	}
);

export const Chat = new mongoose.model("chat", chatSchema);
