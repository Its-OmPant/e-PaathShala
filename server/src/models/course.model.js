import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
		required: true,
	},
	coverImage: {
		type: String,
		required: true,
	},
	branches: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "branch",
		},
	],
});

export const Course = new mongoose.model("course", courseSchema);
