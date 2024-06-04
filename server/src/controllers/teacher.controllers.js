// DB MODELS
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { Chapter } from "../models/chapter.model.js";
import { Student } from "../models/student.model.js";
import { Lecture } from "../models/lecture.model.js";
import { Chat } from "../models/chat.model.js";
import { Library } from "../models/library.model.js";

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
			id: teacher._id,
			fullName: teacher.fullName,
			email: teacher.email,
			profileImage: teacher.profileImage,
			role: teacher.role,
			college: teacher.college,
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

	const seenIds = new Set();
	const uniqueData = [];

	selectedBranches.forEach((entry) => {
		const branchId = entry.branch._id;
		if (!seenIds.has(branchId)) {
			uniqueData.push(entry);
			seenIds.add(branchId);
		}
	});

	return res
		.status(200)
		.json(new ApiResponse(200, uniqueData, "Branches fetched Successfully"));
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

const getListOfChaptersInSubject = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	const { subjectId } = req.params;

	const chapters = await Subject.findById(subjectId)
		.populate({ path: "content", select: "chapterName chapterNo" })
		.select("name content");

	if (!chapters) {
		return res
			.status(500)
			.json(new ApiError(500, "Chapters fetching failed due to server error"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, chapters, "Chapters Fetched Successfully"));
});

// const isLectureNoExists = asyncHandler(async (req, res) => {
// 	const { subjectId, chapterId, lectureNo } = req.body;

// 	if (!subjectId || !chapterId || !lectureNo) {
// 		return res.status(400).json(new ApiError(400, "All Fields are required"));
// 	}

// 	const subject = await Subject.findById(subjectId)
// 		.populate({
// 			path: "content",
// 			select: "chapterNo lectures",
// 		})
// 		.select("content");

// 	// console.log(subject);

// 	if (!subject) {
// 		return res.status(400).json("Subject Or Chapter not found");
// 	}

// 	const chapter = subject.content?.filter((ch) => ch._id == chapterId);

// 	const isLectureExists = chapter.lectures?.filter(
// 		(lec) => lec.lectureNo == lectureNo
// 	);

// 	console.log(chapter);
// 	console.log(isLectureExists);

// 	res.send("Hello");
// });

const createLecture = asyncHandler(async (req, res) => {
	const { videoUrl, lectureName, lectureNo, chapterId } = req.body;

	if (!videoUrl) {
		return res.status(400).json(new ApiError(400, "Video Url not Found"));
	}

	if (!lectureName || !lectureNo) {
		return res
			.status(400)
			.json(new ApiError(400, "Lecture name and number both are required"));
	}

	const chapter = await Chapter.findById(chapterId);

	if (!chapter) {
		return res.status(400).json(new ApiError(400, "Invalid Chpter Id"));
	}

	const lecture = await Lecture.create({
		lectureName,
		lectureNo,
		fileUrl: videoUrl,
	});

	if (!lecture) {
		return res
			.status(400)
			.json(new ApiError(400, "Lecture Creation Failed due to server error"));
	}

	chapter.lectures.push(lecture._id);
	await chapter.save();

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Lecture created successfully"));
});

const getAllChatGroups = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as Teacher"));
	}

	const teacher = await Teacher.findById(user_id).select("-password");

	if (!teacher) {
		return res.status(400).json(new ApiError(400, "Invalid Teacher Id"));
	}

	const chats = await Chat.find({
		chatAdmin: teacher._id,
		college: teacher.college,
	}).select("chatName coverImage");

	if (!chats) {
		return res.status(500).json(new ApiError(500, "Chats Not found !!"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, chats, "Chats Fetched Successfully"));
});

const getChatDetailsById = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;
	const { chatId } = req.params;

	if (user_role !== "teacher") {
		return res
			.status(400)
			.json(new ApiError(400, "You are not authorized as Teacher"));
	}

	const chat = await Chat.findById(chatId)
		.select("-college -subject")
		.populate([
			{ path: "chatAdmin", select: "fullName" },
			{
				path: "chatParticipents",
				populate: { path: "_id" },
				select: "fullName",
			},
		]);

	if (!chat) {
		return res.status(400).json(new ApiError(400, "Invalid Chat ID"));
	}

	if (chat.chatAdmin._id != user_id) {
		return res
			.status(400)
			.json(new ApiError(400, "You do not have access to this chat"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, chat, "Chat Details Fetched successfully"));
});

const autoAddStudentsToChat = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	const { chatId } = req.params;

	if (!chatId) {
		return res.status(400).json(new ApiError(400, "Chat ID is Required"));
	}

	const chat = await Chat.findById(chatId).populate("subject");

	if (chat.chatAdmin != user_id) {
		return res
			.status(400)
			.json(
				new ApiError(400, "You don't have access to modify chat, NOT AN ADMIN")
			);
	}

	const courseId = chat.subject.course;
	const branchId = chat.subject.branch;

	let studentAddedCount = 0;
	const allStudents = await Student.find({
		course: courseId,
		branch: branchId,
	}).select(" _id");

	allStudents.forEach((std) => {
		const isPresent = chat.chatParticipents.findIndex((elem) =>
			elem.equals(std._id)
		);
		if (isPresent < 0) {
			studentAddedCount++;
			chat.chatParticipents.push(std);
		}
	});

	await chat.save();
	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ studentAdded: studentAddedCount },
				`${studentAddedCount} Student added to chat`
			)
		);
});

const getTeacherDashboardAnalytics = asyncHandler(async (req, res) => {
	const { user_id, user_role } = req;

	if (user_role !== "teacher") {
		return res.status(400).json(new ApiError("Not Authorized as teacher"));
	}

	const teacher = await Teacher.findById(user_id).select(
		"teachCourses teachSubjects college"
	);

	const resource = await Library.find({
		college: teacher.college,
	}).countDocuments();

	if (!teacher) {
		return res.status(400).json(new ApiError("Invalid Teacher ID"));
	}
	const data = {
		courses: teacher.teachCourses.length,
		subjects: teacher.teachSubjects.length,
		resource,
	};
	return res.status(200).json(new ApiResponse(200, data, "Analytics fetched"));
});

export {
	teacherLogin,
	getTeacherProfileDetails,
	getTeacherSubjects,
	getListOfCourseTeaches,
	getListOfBranchTeachesByCourseId,
	getStudentsByCourseAndBranch,
	createChapter,
	getListOfChaptersInSubject,
	createLecture,
	getAllChatGroups,
	getChatDetailsById,
	autoAddStudentsToChat,
	getTeacherDashboardAnalytics,
};
