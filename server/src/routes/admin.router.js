import express from "express";
import { adminLogin, adminRegister } from "../controllers/admin.controllers.js";

// middlewares
import { multerUploader } from "../middleware/multer.middleware.js";

const router = express.Router();

router
	.route("/register")
	.post(multerUploader.single("profileImage"), adminRegister);

router.route("/login").post(adminLogin);

export default router;
