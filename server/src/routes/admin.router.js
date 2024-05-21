import express from "express";
import {
	adminLogin,
	createCourse,
	createStudent,
	createSubject,
	createTeacher,
} from "../controllers/admin.controllers.js";

// middlewares
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// no need for direct admin registration
// router
// 	.route("/register")
// 	.post(multerUploader.single("profileImage"), adminRegister);

//                  ************* ADMIN RELATED ROUTES *************
router.route("/login").post(adminLogin);

//                  ************* STUDENT RELATED ROUTES *************
router.route("/students/create").post(verifyJWT, createStudent);

//                  ************* COURSE RELATED ROUTES *************
router.route("/courses/create").post(verifyJWT, createCourse);

//                  ************* TEACHER RELATED ROUTES *************
router.route("/teachers/create").post(verifyJWT, createTeacher);

//                  ************* SUBJECT RELATED ROUTES *************
router.route("/subjects/create").post(verifyJWT, createSubject);

export default router;
