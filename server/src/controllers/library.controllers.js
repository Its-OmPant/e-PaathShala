import { Library } from "../models/library.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllResources = asyncHandler(async (req, res) => {
	const { collegeID } = req.params;

	const resource = await Library.find({ college: collegeID });
	if (!resource) {
		return res.status(500).json(new ApiError(500, "Resources Not Found"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, resource, "Resources Fetched successfully"));
});

export { getAllResources };
