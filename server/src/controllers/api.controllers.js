// utilities
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateSignature = (req, res) => {
	const { folder } = req.body;

	if (!folder) {
		return res.status(400).json(new ApiError("folder name is required"));
	}

	try {
		const timestamp = Math.round(new Date().getTime() / 1000);

		const signature = cloudinary.utils.api_sign_request(
			{
				timestamp,
				folder,
			},
			process.env.CLOUDINARY_API_SECRET
		);

		return res.status(200).json({ timestamp, signature });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(new ApiError(200, "Unable to generate Signature, Server Error"));
	}
};

export { generateSignature };
