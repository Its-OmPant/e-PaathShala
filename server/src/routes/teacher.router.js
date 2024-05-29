import express from "express";
import {
	getTeacherProfileDetails,
	teacherLogin,
} from "../controllers/teacher.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/login").post(teacherLogin);
router.route("/profile").get(verifyJWT, getTeacherProfileDetails);

export default router;
