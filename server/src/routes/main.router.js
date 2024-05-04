import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Main Route");
});

export default router;
