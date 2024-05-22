// DB MODELS
import { Teacher } from "../models/teacher.model.js";

// Utilities
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const teacherLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required", false));
	}

	const teacher = await Teacher.findOne({ email });

	if (!teacher) {
		return res
			.status(404)
			.json(new ApiError(404, "Email doesn't Exist", false));
	}

	if (teacher.password !== password) {
		return res.status(400).json(new ApiError(400, "Incorrect Password", false));
	}

	const token = await teacher.generateToken();

	res.status(200).json(
		new ApiResponse(200, {
			fullName: teacher.fullName,
			email: teacher.email,
			profileImage: teacher.profileImage,
			role: teacher.role,
			token,
		})
	);
});

export { teacherLogin };