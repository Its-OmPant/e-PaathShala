import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
		required: true,
	},
	profileImage: {
		type: String,
		default: "",
	},
	contactNo: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 10,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "teacher",
	},
	teachCourses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "course",
		},
	],
	teachSubjects: [
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
	attendance: [
		{
			date: Date,
			status: Boolean,
		},
	],
});

teacherSchema.methods.generateToken = async function () {
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

export const Teacher = new mongoose.model("teacher", teacherSchema);
