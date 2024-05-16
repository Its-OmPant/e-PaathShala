import mongoose from "mongoose";

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
	password: {
		type: string,
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
	subjects: [
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
	attendance: {
		type: [
			{
				date: Date,
				isPresent: Boolean,
			},
		],
	},
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

export const Student = new mongoose.model("student", studentSchema);
