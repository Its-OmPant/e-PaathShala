import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "course",
		required: true,
	},
	branch: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "branch",
		required: true,
	},
	taughtBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "teacher",
	},
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
	},
});

export const Subject = new mongoose.model("subject", subjectSchema);