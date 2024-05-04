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

const adminLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, "All fields are required");
	}

	const admin = await Admin.findOne({ email });

	if (!admin) {
		throw new ApiError(404, "Email doesn't exist");
	}

	if (admin.password !== password) {
		throw new ApiError(400, "Incorrect Password");
	}

	const token = await admin.generateToken();

	res.status(200).json(
		new ApiResponse(
			200,
			{
				fullName: admin.fullName,
				email: admin.email,
				schoolName: admin.schoolName,
				profileImage: admin.profileImage,
				token,
			},
			"Logged In Successfully"
		)
	);
});
export { adminRegister, adminLogin };
