import express from "express";
import {
	getStudentProfileDetails,
	getStudentSubjects,
	studentLogin,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(studentLogin);
router.route("/profile").get(verifyJWT, getStudentProfileDetails);

router.route("/subjects/all").get(verifyJWT, getStudentSubjects);

export default router;
