import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

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
			default: "",
		},
	},
	{ timestamps: true }
);

adminSchema.methods.generateToken = async function () {
	return jwt.sign(
		{
			_id: this._id,
			role: this.role,
		},
		process.env.JWT_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.JWT_TOKEN_EXPIRY,
		}
	);
};

export const Admin = new mongoose.model("admin", adminSchema);
