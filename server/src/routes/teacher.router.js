import express from "express";
import {
	autoAddStudentsToChat,
	createChapter,
	createLecture,
	getAllChatGroups,
	getChatDetailsById,
	getListOfBranchTeachesByCourseId,
	getListOfChaptersInSubject,
	getListOfCourseTeaches,
	getStudentsByCourseAndBranch,
	getTeacherDashboardAnalytics,
	getTeacherProfileDetails,
	getTeacherSubjects,
	teacherLogin,
} from "../controllers/teacher.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

import { getSubjectDetailsById } from "../controllers/subject.controllers.js";

const router = express.Router();

router.route("/login").post(teacherLogin);
router.route("/profile").get(verifyJWT, getTeacherProfileDetails);

router.route("/dashboard").get(verifyJWT, getTeacherDashboardAnalytics);

router.route("/subjects/all").get(verifyJWT, getTeacherSubjects);
router.route("/subjects/:subjectId").get(verifyJWT, getSubjectDetailsById);

router
	.route("/subjects/:subjectId/chapters/create")
	.post(verifyJWT, createChapter);

router
	.route("/subjects/:subjectId/chapters/all")
	.get(verifyJWT, getListOfChaptersInSubject);

router.route("/courses/teaches").get(verifyJWT, getListOfCourseTeaches);
router
	.route("/branches/teaches")
	.post(verifyJWT, getListOfBranchTeachesByCourseId);

router.route("/students").post(verifyJWT, getStudentsByCourseAndBranch);

// router.route("/lecture/exists").post(isLectureNoExists);
router.route("/lecture/create").post(createLecture);

router.route("/chats/all/").get(verifyJWT, getAllChatGroups);
router.route("/chats/:chatId").get(verifyJWT, getChatDetailsById);
router
	.route("/chats/:chatId/autoAddStudents")
	.get(verifyJWT, autoAddStudentsToChat);

export default router;
