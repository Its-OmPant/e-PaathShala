import express from "express";

import {
	getAllContacts,
	getAllSubscribers,
	getListOfAllSubscriptionRequests,
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
router.route("/subscriptionRequest/all").get(getListOfAllSubscriptionRequests);

router.route("/contacts/all").get(getAllContacts);
router.route("/subscribers/all").get(getAllSubscribers);

export default router;
