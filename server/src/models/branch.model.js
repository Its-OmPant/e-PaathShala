import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	inCourse: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "course",
		required: true,
	},
	subjects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "subject",
		},
	],
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
		required: true,
	},
});

export const Branch = new mongoose.model("branch", branchSchema);
