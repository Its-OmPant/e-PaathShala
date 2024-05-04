import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
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
		role: {
			type: String,
			default: "Admin",
		},
		profileImage: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Admin = new mongoose.model("admin", adminSchema);
