import express from "express";

import {
	addContact,
	deteleContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/add").post(addContact);
router.route("/remove").delete(deteleContact);

export default router;
