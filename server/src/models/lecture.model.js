import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
	lectureName: {
		type: String,
		required: true,
	},
	lectureNo: {
		type: Number,
		required: true,
	},
	fileUrl: {
		type: String,
		required: true,
	},
});

export const Lecture = new mongoose.model("lecture", lectureSchema);
