import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	fileUrl: {
		type: String,
		required: true,
	},
});

export const Lecture = new mongoose.model("lecture", lectureSchema);
