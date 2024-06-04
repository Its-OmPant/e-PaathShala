import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
	createNewMessage,
	fetchAllMessages,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.route("/:chatId/messages/all").get(verifyJWT, fetchAllMessages);
router.route("/messages/new").post(verifyJWT, createNewMessage);

export default router;
