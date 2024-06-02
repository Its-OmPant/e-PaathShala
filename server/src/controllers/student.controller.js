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
			college: student.college,
			token,
		})
	);
});

const getStudentProfileDetails = asyncHandler(async (req, res) => {
	const studentId = req.user_id;

	const student = await Student.findById(studentId)
		.populate([
			{ path: "course", select: "name" },
			{ path: "branch", select: "name" },
			{ path: "college", select: "college" },
		])
		.select("-role -password -attendance -result");

	if (!student) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Student Details Fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, student, "Student Details Fetched Successfully")
		);
});

const getStudentSubjects = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "student") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as student"));
	}

	const student = await Student.findById(user_id)
		.populate({
			path: "branch",
			select: "subjects",
			populate: {
				path: "subjects",
				select: "name code course branch taughtBy coverImage",
				populate: [
					{
						path: "course",
						select: "name",
					},
					{ path: "branch", select: "name" },
					{ path: "taughtBy", select: "fullName" },
				],
			},
		})
		.select("branch");

	const subjects = student.branch.subjects;

	if (!subjects) {
		return res.status(500).jsno(new ApiError(500, "Subjects not found "));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});
export { studentLogin, getStudentProfileDetails, getStudentSubjects };
