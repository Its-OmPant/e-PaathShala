import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	file_url: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	college: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
	},
});

export const Library = new mongoose.model("library", librarySchema);
