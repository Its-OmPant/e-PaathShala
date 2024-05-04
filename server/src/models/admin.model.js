import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		schoolName: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

const Admin = new mongoose.model("admin", adminSchema);
