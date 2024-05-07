import express from "express";

import {
	getListOfAllSubscriptions,
	mainAdminLogin,
	mainAdminRegister,
	newSchoolAdminRegister,
	saveNewAdminToRegister,
} from "../controllers/main_admin.controllers.js";

const router = express.Router();

router.route("/register").post(mainAdminRegister);
router.route("/login").post(mainAdminLogin);
router.route("/create/adminAccount").post(newSchoolAdminRegister);

router.route("/subscription/add").post(saveNewAdminToRegister);
router.route("/subscription/all").get(getListOfAllSubscriptions);

export default router;
