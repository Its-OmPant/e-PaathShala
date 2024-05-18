// DB Models
import { Branch } from "../models/branch.model.js";
import { Course } from "../models/course.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBranch = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { name, courseId } = req.body;

	if (!name || !courseId) {
		return res
			.status(400)
			.json(new ApiError(400, "All Fields are required", false));
	}

	const isBranchExists = await Branch.findOne({ name, inCourse: courseId });

	if (isBranchExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Branch Already Exists in the Course", false));
	}

	const branch = await Branch.create({
		name,
		inCourse: courseId,
		college: admin_id,
	});

	if (!branch) {
		return res
			.status(500)
			.json(new ApiError(500, "Branch Creation Failed", false));
	}

	const course = await Course.findById(courseId);
	course.branches.push(branch._id);
	await course.save();

	return res
		.status(200)
		.json(new ApiResponse(201, branch, "Branch Added Successfully"));
});

export { createBranch };
