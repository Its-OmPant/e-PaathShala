import express from "express";
import {
	adminLogin,
	createCourse,
	createStudent,
	createSubject,
	createTeacher,
	getAllCourses,
	getAllStudents,
	getAllTeachers,
	getListOfBranchesByCourseId,
	getCourseDetailsById,
	getListOfTeacherNames,
} from "../controllers/admin.controllers.js";

// middlewares
import { verifyJWT } from "../middleware/auth.middleware.js";
import { multerUploader } from "../middleware/multer.middleware.js";

const router = express.Router();

// no need for direct admin registration
// router
// 	.route("/register")
// 	.post(multerUploader.single("profileImage"), adminRegister);

//                  ************* ADMIN RELATED ROUTES *************
router.route("/login").post(adminLogin);

//                  ************* STUDENT RELATED ROUTES *************
router.route("/students/create").post(verifyJWT, createStudent);
router.route("/students/all").get(verifyJWT, getAllStudents);

//                  ************* COURSE RELATED ROUTES *************
router
	.route("/courses/create")
	.post(multerUploader.single("coverImage"), createCourse);
router.route("/courses/all").get(verifyJWT, getAllCourses);
router.route("/courses/:courseId").get(verifyJWT, getCourseDetailsById);

//                  ************* TEACHER RELATED ROUTES *************
router.route("/teachers/create").post(verifyJWT, createTeacher);
router.route("/teachers/all").get(verifyJWT, getAllTeachers);
router.route("/teachers/list").get(verifyJWT, getListOfTeacherNames);

//                  ************* SUBJECT RELATED ROUTES *************
router
	.route("/subjects/create")
	.post(multerUploader.single("coverImage"), createSubject);

//                  ************* BRANCH RELATED ROUTES *************
router.route("/branches/:courseID").get(verifyJWT, getListOfBranchesByCourseId);

export default router;
