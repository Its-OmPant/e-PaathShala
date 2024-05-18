import express from "express";

import { createBranch } from "../controllers/branch.controllers.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/branch/create").post(verifyJWT, createBranch);

export default router;
