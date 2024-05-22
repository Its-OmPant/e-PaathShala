// DB MODELS
import { Student } from "../models/student.model.js";

// Utilities
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const studentLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required", false));
	}

	const student = await Student.findOne({ email });

	if (!student) {
		return res
			.status(404)
			.json(new ApiError(404, "Email doesn't Exist", false));
	}

	if (student.password !== password) {
		return res.status(400).json(new ApiError(400, "Incorrect Password", false));
	}

	const token = await student.generateToken();

	res.status(200).json(
		new ApiResponse(200, {
			fullName: student.fullName,
			email: student.email,
			profileImage: student.profileImage,
			role: student.role,
			token,
		})
	);
});

const getStudentById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json(new ApiError(400, "Id is required"));
	}

	const student = await Student.findById(id)
		.populate({
			path: "course",
			select: "name -_id",
		})
		.populate({
			path: "branch",
			select: "name -_id",
		})
		.select("-password -role -college");

	if (!student) {
		return res.status(400).json(new ApiError(400, "Student with ID Not Found"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, student, "Student Found Successfully"));
});

export { studentLogin, getStudentById };
