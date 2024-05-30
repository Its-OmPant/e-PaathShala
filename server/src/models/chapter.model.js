import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
	chapterName: {
		type: String,
		required: true,
	},
	lectures: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "lecture",
		},
	],
	assignments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "assignment",
		},
	],
	subject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "subject",
	},
});

export const Chapter = new mongoose.model("chapter", chapterSchema);
