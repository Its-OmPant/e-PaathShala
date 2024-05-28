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
	getTotalStudentCount,
	getTotalCourseCount,
	getTotalTeacherCount,
	deleteStudentById,
	deleteTeacherById,
	getTotalSubjectCount,
	getAllSubjects,
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
router.route("/students/count").get(verifyJWT, getTotalStudentCount);
router
	.route("/students/delete/:studentId")
	.delete(verifyJWT, deleteStudentById);

//                  ************* COURSE RELATED ROUTES *************
router
	.route("/courses/create")
	.post(multerUploader.single("coverImage"), createCourse);
router.route("/courses/all").get(verifyJWT, getAllCourses);
router.route("/courses/count").get(verifyJWT, getTotalCourseCount);
router.route("/courses/:courseId").get(verifyJWT, getCourseDetailsById);

//                  ************* TEACHER RELATED ROUTES *************
router.route("/teachers/create").post(verifyJWT, createTeacher);
router.route("/teachers/all").get(verifyJWT, getAllTeachers);
router.route("/teachers/list").get(verifyJWT, getListOfTeacherNames);
router.route("/teachers/count").get(verifyJWT, getTotalTeacherCount);
router
	.route("/teachers/delete/:teacherId")
	.delete(verifyJWT, deleteTeacherById);

//                  ************* SUBJECT RELATED ROUTES *************
router
	.route("/subjects/create")
	.post(multerUploader.single("coverImage"), createSubject);

router.route("/subjects/count").get(verifyJWT, getTotalSubjectCount);
router.route("/subjects/all").get(verifyJWT, getAllSubjects);

//                  ************* BRANCH RELATED ROUTES *************
router.route("/branches/:courseID").get(verifyJWT, getListOfBranchesByCourseId);

export default router;
