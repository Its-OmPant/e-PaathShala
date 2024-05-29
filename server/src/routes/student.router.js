import express from "express";
import {
	getStudentProfileDetails,
	studentLogin,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(studentLogin);
router.route("/profile").get(verifyJWT, getStudentProfileDetails);

export default router;
