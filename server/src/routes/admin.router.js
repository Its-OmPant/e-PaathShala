import express from "express";
import { adminLogin, createCourse } from "../controllers/admin.controllers.js";

// middlewares
import { multerUploader } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// no need for direct admin registration
// router
// 	.route("/register")
// 	.post(multerUploader.single("profileImage"), adminRegister);

//                  ************* ADMIN RELATED ROUTES *************
router.route("/login").post(adminLogin);

//                  ************* COURSE RELATED ROUTES *************

router.route("/courses/create").post(verifyJWT, createCourse);
export default router;
