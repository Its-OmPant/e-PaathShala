// DB models
import { Admin } from "../models/admin.model.js";
import { Course } from "../models/course.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { Branch } from "../models/branch.model.js";
import { Student } from "../models/student.model.js";

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
				id: admin._id,
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

// 					********* 	STUDENT RELATED CONTROLLERS *********

const createStudent = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const {
		fullName,
		email,
		gender,
		dateOfBirth,
		contactNo,
		password,
		courseId,
		branchId,
	} = req.body;

	if (
		!fullName ||
		!email ||
		!gender ||
		!dateOfBirth ||
		!password ||
		!contactNo ||
		!courseId ||
		!branchId
	) {
		return res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const isStudentExists = await Student.findOne({ email });

	if (isStudentExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Student with email already exists"));
	}

	const newStudent = await Student.create({
		fullName,
		email,
		gender,
		dateOfBirth,
		contactNo,
		password,
		course: courseId,
		branch: branchId,
		college: admin_id,
	});

	if (!newStudent) {
		return res.status(500).json(new ApiError(500, "Student Creation Failed"));
	}

	const createdStudent = await Student.findById(newStudent._id).select(
		"-password"
	);

	return res
		.status(200)
		.json(new ApiResponse(201, createdStudent, "Student Created Successfully"));
});

const getAllStudents = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const result = await Student.find({ college: admin_id })
		.populate({
			path: "course",
			select: "name -_id",
		})
		.populate({
			path: "branch",
			select: "name -_id",
		})
		.select(
			"-password -fatherName -motherName -role -college -attendance -result"
		);

	if (!result) {
		return res
			.status(500)
			.json(new ApiError(500, "Fetching Students Failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, result, "Fetched All Students"));
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

const getAllCourses = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const result = await Course.find({ college: admin_id })
		.populate({
			path: "branches",
			select: "name",
		})
		.select("-college");

	if (!result) {
		return res
			.status(500)
			.json(new ApiError(500, "Fetching Courses Failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, result, "Fetched All Courses"));
});

// 					********* 	TEACHER RELATED CONTROLLERS *********

const createTeacher = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { fullName, email, gender, contactNo, password } = req.body;

	if (!fullName || !email || !gender || !contactNo || !password) {
		return res
			.status(400)
			.json(new ApiError(400, "All Fields are required", false));
	}

	const isTeacherExist = await Teacher.findOne({ email, college: admin_id });

	if (isTeacherExist) {
		return res
			.status(400)
			.json(new ApiError(400, "Teacher with Email Already Exist", false));
	}

	const isContactExists = await Teacher.findOne({ contactNo });
	if (isContactExists) {
		return res.status(400).json(new ApiError(400, "Contact already is in use"));
	}

	const newTeacher = await Teacher.create({
		fullName,
		email,
		gender,
		contactNo,
		password,
		college: admin_id,
	});

	if (!newTeacher) {
		return res
			.status(500)
			.json(new ApiError(500, "Server Error :: Teacher Creation Failed"));
	}

	const teacher = await Teacher.findById(newTeacher._id).select("-password");

	return res
		.status(200)
		.json(new ApiResponse(201, teacher, "Teacher Added successfully"));
});

const getAllTeachers = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const result = await Teacher.find({ college: admin_id })
		.populate({
			path: "teachCourses",
			select: "name -_id",
		})
		.select("-password -role -teachSubjects -attendance -college");

	if (!result) {
		return res
			.status(500)
			.json(new ApiError(500, "Fetching Teachers Failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, result, "Fetched All Teachers"));
});

// 					********* 	SUBJECT RELATED CONTROLLERS *********

const createSubject = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const { name, code, courseId, branchId, teacherId } = req.body;

	if (!name || !code || !courseId || !branchId || !teacherId) {
		return res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const isSubjectExists = await Subject.findOne({ name, college: admin_id });
	if (isSubjectExists) {
		return res.status(400).json(new ApiError(400, "Subject Already Exists"));
	}

	const newSubject = await Subject.create({
		name,
		code,
		course: courseId,
		branch: branchId,
		taughtBy: teacherId,
		college: admin_id,
	});

	if (!newSubject) {
		return res.status(500).json(new ApiError(500, "Subject Creation Failed"));
	}

	const branch = await Branch.findById(branchId);
	branch.subjects.push(newSubject._id);
	await branch.save();

	const teacher = await Teacher.findById(teacherId);
	teacher.teachSubjects.push(newSubject._id);
	teacher.teachCourses.push(courseId);
	await teacher.save();

	return res
		.status(200)
		.json(new ApiResponse(201, newSubject, "Subject Created Successfully"));
});

export {
	adminLogin,
	createCourse,
	createTeacher,
	createSubject,
	createStudent,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
};
