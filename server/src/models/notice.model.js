import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
	},
});

export const Notice = new mongoose.model("notice", noticeSchema);
