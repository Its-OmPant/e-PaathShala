import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "chat",
		},
		content: {
			type: String,
			required: true,
		},
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			refPath: "senderType",
		},
		senderType: {
			type: String,
			required: true,
			enum: ["student", "teacher"],
		},
	},
	{
		timestamps: true,
	}
);

export const Message = new mongoose.model("message", messageSchema);
