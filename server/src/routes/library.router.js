import express from "express";
import { getAllResources } from "../controllers/library.controllers.js";

const router = express.Router();

router.route("/resource/all/:collegeID").get(getAllResources);

export default router;
