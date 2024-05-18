// DB models
import { Admin } from "../models/admin.model.js";
import { Course } from "../models/course.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// no need for direct admin registration
// const adminRegister = asyncHandler(async (req, res) => {
// 	const { fullName, email, password, schoolName } = req.body;

// 	if (!fullName || !email || !password || !schoolName) {
// 		return res
// 			.status(400)
// 			.json(new ApiError(400, "All Fields are required", false));
// 	}

// 	const isEmailExists = await Admin.findOne({ email });

// 	if (isEmailExists) {
// 		return res
// 			.status(400)
// 			.json(new ApiError(400, "Email Already Exists", false));
// 	}

// 	const isSchoolExists = await Admin.findOne({ schoolName });

// 	if (isSchoolExists) {
// 		return res
// 			.status(404)
// 			.json(new ApiError(404, "School Name Already Exists", false));
// 	}

// 	let profileImageLocalPath;
// 	if (req.file && req.file.path) {
// 		profileImageLocalPath = req.file.path;
// 	}

// 	const profileImageObj = await uploadOnCloudinary(profileImageLocalPath);

// 	const admin = await Admin.create({
// 		fullName,
// 		email,
// 		password,
// 		schoolName,
// 		profileImage: profileImageObj?.url || "",
// 	});

// 	const createdAdmin = await Admin.findById(admin?._id).select("-password");

// 	if (!createdAdmin) {
// 		return res
// 			.status(500)
// 			.json(
// 				new ApiError(500, "Something went wrong while registering admin", false)
// 			);
// 	}
// 	return res
// 		.status(200)
// 		.json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
// });

const adminLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required", false));
	}

	const admin = await Admin.findOne({ email });

	if (!admin) {
		return res
			.status(404)
			.json(new ApiError(404, "Email doesn't Exist", false));
	}

	if (admin.password !== password) {
		return res.status(400).json(new ApiError(400, "Incorrect Password", false));
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
				role: admin.role,
				token,
			},
			"Logged In Successfully"
		)
	);
});

// 					********* 	COURSE RELATED CONTROLLERS *********

const createCourse = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { name } = req.body;

	if (!name) {
		return res
			.status(400)
			.json(new ApiError(400, "All fields are required", false));
	}

	const isCourseExists = await Course.findOne({ name, college: admin_id });

	if (isCourseExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Course already exists", false));
	}

	const course = await Course.create({
		name,
		college: admin_id,
	});

	if (!course) {
		return res
			.status(500)
			.json(new ApiError(500, "Course Creation Failed", false));
	}

	return res
		.status(200)
		.json(new ApiResponse(201, course, "New Course Created Successfully"));
});

export { adminLogin, createCourse };
