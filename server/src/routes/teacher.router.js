import express from "express";
import {
	getListOfBranchTeachesByCourseId,
	getListOfCourseTeaches,
	getStudentsByCourseAndBranch,
	getTeacherProfileDetails,
	getTeacherSubjects,
	teacherLogin,
} from "../controllers/teacher.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(teacherLogin);
router.route("/profile").get(verifyJWT, getTeacherProfileDetails);

router.route("/subjects/all").get(verifyJWT, getTeacherSubjects);
router.route("/courses/teaches").get(verifyJWT, getListOfCourseTeaches);
router
	.route("/branches/teaches")
	.post(verifyJWT, getListOfBranchTeachesByCourseId);

router.route("/students").post(verifyJWT, getStudentsByCourseAndBranch);
export default router;
