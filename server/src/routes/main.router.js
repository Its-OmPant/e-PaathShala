import express from "express";

// routers
import mainAdminRouter from "./main_admin.router.js";
import adminRouter from "./admin.router.js";
import contactRouter from "./contact.router.js";

const router = express.Router();

router.use("/internal/admin", mainAdminRouter);
router.use("/admin", adminRouter);
router.use("/contact", contactRouter);
export default router;
