import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const mainAdminSchema = new mongoose.Schema({
	adminName: {
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
	role: {
		type: String,
		default: "mainAdmin",
	},
});

mainAdminSchema.methods.generateToken = async function () {
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

export const MainAdmin = new mongoose.model("main_admin", mainAdminSchema);
