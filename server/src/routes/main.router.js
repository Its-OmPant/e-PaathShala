import express from "express";

// routers
import mainAdminRouter from "./main_admin.router.js";
import adminRouter from "./admin.router.js";

const router = express.Router();

router.use("/internal/admin", mainAdminRouter);
router.use("/admin", adminRouter);
export default router;
