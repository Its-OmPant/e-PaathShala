import { Admin } from "../models/admin.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const adminRegister = asyncHandler(async (req, res) => {
	const { fullName, email, password, schoolName } = req.body;

	if (!fullName || !email || !password || !schoolName) {
		throw new ApiError(400, "All Fields are required");
	}

	const isEmailExists = await Admin.findOne({ email });

	if (isEmailExists) {
		throw new ApiError(400, "Email Already Exists");
	}

	const isSchoolExists = await Admin.findOne({ schoolName });

	if (isSchoolExists) {
		throw new ApiError(400, "School Name Already Exists");
	}

	let profileImageLocalPath;
	if (req.file && req.file.path) {
		profileImageLocalPath = req.file.path;
	}

	const profileImageObj = await uploadOnCloudinary(profileImageLocalPath);

	const admin = await Admin.create({
		fullName,
		email,
		password,
		schoolName,
		profileImage: profileImageObj?.url || "",
	});

	const createdAdmin = await Admin.findById(admin?._id).select("-password");

	if (!createdAdmin) {
		throw new ApiError(500, "Something went wrong while registrating admin");
	}
	return res
		.status(200)
		.json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
});

export { adminRegister };
