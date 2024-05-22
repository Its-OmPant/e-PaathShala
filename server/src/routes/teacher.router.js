import express from "express";
import {
	getTeacherById,
	teacherLogin,
} from "../controllers/teacher.controllers.js";

const router = express.Router();

router.route("/login").post(teacherLogin);
router.route("/profile/:id").get(getTeacherById);

export default router;
