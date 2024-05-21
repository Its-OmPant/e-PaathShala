import express from "express";
import { studentLogin } from "../controllers/student.controller.js";

const router = express.Router();

router.route("/login").post(studentLogin);

export default router;
