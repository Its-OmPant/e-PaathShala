import express from "express";
import {
	getStudentChatDetailsById,
	getStudentDashboardAnalytics,
	getStudentProfileDetails,
	getStudentSubjects,
	getStudentsAllChatGroups,
	studentLogin,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(studentLogin);
router.route("/profile").get(verifyJWT, getStudentProfileDetails);
router.route("/dashboard").get(verifyJWT, getStudentDashboardAnalytics);

router.route("/subjects/all").get(verifyJWT, getStudentSubjects);

router.route("/chats/all").get(verifyJWT, getStudentsAllChatGroups);
router.route("/chats/:chatId").get(verifyJWT, getStudentChatDetailsById);

export default router;
