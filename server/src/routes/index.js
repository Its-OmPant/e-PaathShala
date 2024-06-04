import express from "express";

// routers
import mainAdminRouter from "./main_admin.router.js";
import adminRouter from "./admin.router.js";
import contactRouter from "./contact.router.js";
import courseRouter from "./course.router.js";
import studentRouter from "./student.router.js";
import teacherRouter from "./teacher.router.js";
import libraryRouter from "./library.router.js";
import messagesRouter from "./messages.router.js";
import { generateSignature } from "../controllers/api.controllers.js";

const router = express.Router();

router.route("/api/sign-upload").post(generateSignature);

router.use("/internal/admin", mainAdminRouter);
router.use("/admin", adminRouter);
router.use("/contact", contactRouter);
router.use("/course", courseRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/library", libraryRouter);
router.use("/chat", messagesRouter);

export default router;
