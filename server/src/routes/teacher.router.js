import express from "express";
import { teacherLogin } from "../controllers/teacher.controllers.js";

const router = express.Router();

router.route("/login").post(teacherLogin);

export default router;
