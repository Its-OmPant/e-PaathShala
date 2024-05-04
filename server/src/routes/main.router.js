import express from "express";

// routers
import adminRouter from "./admin.router.js";

const router = express.Router();

router.use("/admin", adminRouter);
export default router;
