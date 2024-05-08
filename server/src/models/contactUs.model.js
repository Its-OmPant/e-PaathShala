import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

export const Contact = new mongoose.model("contact", contactSchema);
