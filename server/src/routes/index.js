import express from "express";

// routers
import mainAdminRouter from "./main_admin.router.js";
import adminRouter from "./admin.router.js";
import contactRouter from "./contact.router.js";
import courseRouter from "./course.router.js";
import studentRouter from "./student.router.js";
import teacherRouter from "./teacher.router.js";

const router = express.Router();

router.use("/internal/admin", mainAdminRouter);
router.use("/admin", adminRouter);
router.use("/contact", contactRouter);
router.use("/course", courseRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

export default router;
