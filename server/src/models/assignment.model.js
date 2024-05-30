import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	fileUrl: {
		type: String,
		required: true,
	},
	ofMarks: {
		type: Number,
		required: true,
	},
});

export const Assignment = new mongoose.model("assignment", assignmentSchema);
