import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	fatherName: {
		type: String,
		default: "",
	},
	motherName: {
		type: String,
		default: "",
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
	dateOfBirth: {
		type: Date,
		required: true,
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
		default: "student",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "course",
		required: true,
	},
	branch: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "branch",
		required: true,
	},
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
	result: [
		{
			subjectName: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "subject",
			},
			marks: Number,
		},
	],
});

studentSchema.methods.generateToken = async function () {
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

export const Student = new mongoose.model("student", studentSchema);
