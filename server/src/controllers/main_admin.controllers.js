import { MainAdmin } from "../models/mainAdmin.model.js";
import { Admin } from "../models/admin.model.js";

import { uploadOnCloudinary } from "../utils/Cloudinary.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// controller for main admin registration
const mainAdminRegister = asyncHandler(async (req, res) => {
	const { adminName, email, password } = req.body;

	if (!adminName || !email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "All Fields are required", false));
	}

	const isEmailAlreadyExists = await MainAdmin.findOne({ email });

	if (isEmailAlreadyExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Email already Exists", false));
	}

	const newAdmin = await MainAdmin.create({ adminName, email, password });

	const createdAdmin = await MainAdmin.findById(newAdmin?._id).select(
		"-password"
	);

	if (!createdAdmin) {
		return res
			.status(500)
			.json(
				new ApiError(
					500,
					"Admin Account Creation Failed due to internal server error",
					false
				)
			);
	}

	return res
		.status(200)
		.json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
});

// controller fro main admin login
const mainAdminLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "Email and Password both are required", false));
	}

	const admin = await MainAdmin.findOne({ email });

	if (!admin) {
		return res
			.status(400)
			.json(new ApiError(400, "Email Doesn't Exist", false));
	}

	if (admin?.password !== password) {
		return res.status(400).json(new ApiError(400, "Incorrect Password", false));
	}

	const token = await admin.generateToken();

	res.status(200).json(
		new ApiResponse(
			200,
			{
				adminName: admin.adminName,
				email: admin.email,
				role: admin.role,
				token,
			},
			"Logged In Succcessfully"
		)
	);
});

// controller for new school admin creation
const newSchoolAdminRegister = asyncHandler(async (req, res) => {
	const { fullName, email, password, schoolName } = req.body;

	if (!fullName || !email || !password || !schoolName) {
		return res
			.status(400)
			.json(new ApiError(400, "All Fields are required", false));
	}

	const isEmailExists = await Admin.findOne({ email });

	if (isEmailExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Email Already Exists", false));
	}

	const isSchoolExists = await Admin.findOne({ schoolName });

	if (isSchoolExists) {
		return res
			.status(404)
			.json(new ApiError(404, "School Name Already Exists", false));
	}

	// code for image upload (not using while registering)
	// let profileImageLocalPath;
	// if (req.file && req.file.path) {
	// 	profileImageLocalPath = req.file.path;
	// }

	// const profileImageObj = await uploadOnCloudinary(profileImageLocalPath);

	const admin = await Admin.create({
		fullName,
		email,
		password,
		schoolName,
		// profileImage: profileImageObj?.url || "",
	});

	const createdAdmin = await Admin.findById(admin?._id).select("-password");

	if (!createdAdmin) {
		return res
			.status(500)
			.json(
				new ApiError(
					500,
					"School Admin Registration Failed due to Internal server error",
					false
				)
			);
	}
	return res
		.status(200)
		.json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
});
export { mainAdminRegister, mainAdminLogin, newSchoolAdminRegister };