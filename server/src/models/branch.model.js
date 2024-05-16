import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	inCourse: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "course",
	},
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
	},
});

export const Branch = new mongoose.model("branch", branchSchema);
