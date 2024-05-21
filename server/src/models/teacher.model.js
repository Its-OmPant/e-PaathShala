import mongoose from "mongoose";

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

export const Teacher = new mongoose.model("teacher", teacherSchema);
