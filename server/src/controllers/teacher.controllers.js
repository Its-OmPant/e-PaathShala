// DB MODELS
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { Chapter } from "../models/chapter.model.js";

// Utilities
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";

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

const getTeacherProfileDetails = asyncHandler(async (req, res) => {
	const teacherId = req.user_id;

	const teacher = await Teacher.findById(teacherId)
		.populate([
			{ path: "teachCourses", select: "name" },
			{ path: "teachSubjects", select: "name" },
			{ path: "college", select: "college" },
		])
		.select("-role -password -attendance");

	if (!teacher) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Teacher Details Fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, teacher, "Teacher Details Fetched Successfully")
		);
});

const getTeacherSubjects = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as teacher"));
	}
	const teacher = await Teacher.findById(user_id).select("-password");

	const subjects = await Subject.find({
		college: teacher.college,
		taughtBy: user_id,
	})
		.populate([
			{ path: "course", select: "name" },
			{ path: "branch", select: "name" },
			{ path: "taughtBy", select: "fullName" },
		])
		.select("-content");

	if (!subjects) {
		return res
			.status(500)
			.json(new ApiError(500, "Couldn't fetch Subjects due to server error "));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, subjects, "Subjects fetched successfully"));
});

const getListOfCourseTeaches = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as teacher"));
	}

	const courses = await Teacher.findById(user_id)
		.populate({
			path: "teachCourses",
			select: "name",
		})
		.select("teachCourses");

	if (!courses) {
		return res
			.status(500)
			.json(new ApiError(500, "Couldn't fetch courses due to server error"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, courses, "Courses fetched Successfully"));
});

const getListOfBranchTeachesByCourseId = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;
	const { courseId } = req.body;

	if (!courseId) {
		return res.status(400).json(new ApiError(400, "Course Id is required"));
	}

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as teacher"));
	}

	const branches = await Teacher.findById(user_id)
		.populate({
			path: "teachSubjects",
			select: "branch  -_id",
			populate: { path: "branch", select: "name inCourse" },
		})
		.select("teachSubjects");

	if (!branches) {
		return res
			.status(500)
			.json(new ApiError(500, "Couldn't fetch branches due to server error"));
	}

	const selectedBranches = branches.teachSubjects.filter(
		(b) => b.branch.inCourse == courseId
	);
	// console.log(selectedBranches);
	return res
		.status(200)
		.json(
			new ApiResponse(200, selectedBranches, "Branches fetched Successfully")
		);
});

const getStudentsByCourseAndBranch = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as teacher"));
	}

	const { courseId, branchId } = req.body;

	if (!courseId || !branchId) {
		return res
			.status(400)
			.json(new ApiError(400, "Course and Branch ID both are required"));
	}

	const teacher = await Teacher.findById(user_id);

	const students = await Student.find({
		college: teacher.college,
		course: courseId,
		branch: branchId,
	})
		.populate([
			{ path: "course", select: "name" },
			{ path: "branch", select: "name" },
		])
		.select("-password -fatherName -motherName -role");

	if (!students) {
		return res
			.status(500)
			.json(new ApiError(500, "Couldn't fetch students due to server error"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, students, "Students fetched Successfully"));
});

const createChapter = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "Only Teacher Can add Chapters"));
	}

	const { subjectId } = req.params;
	const { chapterName, chapterNo } = req.body;

	if (!chapterName || !chapterNo) {
		return res
			.status(400)
			.json(new ApiError(400, "Chapter name and number both are required"));
	}

	const subject = await Subject.findById(subjectId);

	if (!subject) {
		return res
			.status(400)
			.json(new ApiError(400, "Invalid Subject Id, Subject Not Exists"));
	}

	const isChapterExist = await Chapter.findOne({
		chapterNo,
		subject: subjectId,
	});

	if (isChapterExist) {
		return res
			.status(400)
			.json(new ApiError(400, "Chapter Number already exist"));
	}

	const chapter = await Chapter.create({
		chapterName,
		chapterNo,
		subject: subjectId,
	});

	if (!chapter) {
		return res
			.status(500)
			.json(new ApiError(500, "Chapter Creation Failed due to server error"));
	}

	subject.content.push(chapter);
	await subject.save();
	return res
		.status(200)
		.json(new ApiResponse(200, chapter, "Chapter Created Successfully"));
});

export {
	teacherLogin,
	getTeacherProfileDetails,
	getTeacherSubjects,
	getListOfCourseTeaches,
	getListOfBranchTeachesByCourseId,
	getStudentsByCourseAndBranch,
	createChapter,
};
