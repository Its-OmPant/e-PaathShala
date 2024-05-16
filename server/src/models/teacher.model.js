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
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admin",
		required: true,
	},
	attendance: {
		type: [
			{
				date: Date,
				isPresent: Boolean,
			},
		],
	},
});

export const Teacher = new mongoose.model("teacher", teacherSchema);
