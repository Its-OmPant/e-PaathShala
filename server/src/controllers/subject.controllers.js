import { Subject } from "../models/subject.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const getSubjectDetailsById = asyncHandler(async (req, res) => {
	const { subjectId } = req.params;

	if (!subjectId) {
		return res.status(400).json(new ApiError(400, "Subject ID is Required"));
	}

	const subject = await Subject.findById(subjectId).populate([
		{ path: "course", select: "name" },
		{ path: "branch", select: "name" },
		{
			path: "content",
			populate: [
				{
					path: "lectures",
				},
			],
		},
		{ path: "taughtBy", select: "fullName" },
	]);

	if (!subject) {
		return res
			.status(500)
			.json(new ApiError(500, "Subject Fetching Failed due to server error"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, subject, "Subject Fetched Successfully"));
});

export { getSubjectDetailsById };
