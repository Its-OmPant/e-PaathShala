import express from "express";

import {
	mainAdminLogin,
	mainAdminRegister,
	newSchoolAdminRegister,
} from "../controllers/main_admin.controllers.js";

const router = express.Router();

router.route("/register").post(mainAdminRegister);
router.route("/login").post(mainAdminLogin);
router.route("/create/adminAccount").post(newSchoolAdminRegister);

export default router;
