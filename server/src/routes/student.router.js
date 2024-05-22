import express from "express";
import {
	getStudentById,
	studentLogin,
} from "../controllers/student.controller.js";

const router = express.Router();

router.route("/login").post(studentLogin);
router.route("/profile/:id").get(getStudentById);

export default router;
