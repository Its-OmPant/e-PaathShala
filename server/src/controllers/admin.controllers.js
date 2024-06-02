// DB models
import { Admin } from "../models/admin.model.js";
import { Course } from "../models/course.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { Branch } from "../models/branch.model.js";
import { Student } from "../models/student.model.js";
import { Library } from "../models/library.model.js";

// utilities
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

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
				college: admin._id,
				token,
			},
			"Logged In Successfully"
		)
	);
});

const getAdminProfileDetails = asyncHandler(async (req, res) => {
	const adminId = req.user_id;

	const admin = await Admin.findById(adminId).select("-role -password");

	if (!admin) {
		return res
			.status(500)
			.json(new ApiError(500, "Admin Data fetch failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, admin, "Admin details fetched Successfully"));
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

const getTotalStudentCount = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const studentCount = await Student.countDocuments({ college: admin_id });

	if (!studentCount) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Student Count fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, studentCount, "Student Count Fetched Successfully")
		);
});

const getStudentById = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json(new ApiError(400, "Id is required"));
	}

	const student = await Student.findById(id)
		.populate({
			path: "course",
			select: "name -_id",
		})
		.populate({
			path: "branch",
			select: "name -_id",
		})
		.select("-password -role -college");

	if (!student) {
		return res.status(400).json(new ApiError(400, "Student with ID Not Found"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, student, "Student Found Successfully"));
});

const deleteStudentById = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { studentId } = req.params;

	const student = await Student.findByIdAndDelete(studentId);

	if (!student) {
		return res
			.status(400)
			.json(new ApiError(400, "Student with id not found."));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, null, "Student Deleted Successfully"));
});

// 					********* 	COURSE RELATED CONTROLLERS *********

const createCourse = asyncHandler(async (req, res) => {
	// const admin_id = req.user_id;
	const { name, admin_id } = req.body;

	if (!name) {
		return res
			.status(400)
			.json(new ApiError(400, "Name field is required", false));
	}

	const isCourseExists = await Course.findOne({ name, college: admin_id });

	if (isCourseExists) {
		return res
			.status(400)
			.json(new ApiError(400, "Course already exists", false));
	}

	let coverImageLocalPath;

	if (req.file && req.file.path) {
		coverImageLocalPath = req.file.path;
	}

	const coverImageObject = await uploadOnCloudinary(coverImageLocalPath);

	if (!coverImageObject && !coverImageObject?.url) {
		return res
			.status(500)
			.json(new ApiError(500, "Image  Upload Failed. Please Retry!!"));
	}

	const course = await Course.create({
		name,
		coverImage: coverImageObject.url,
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

const getCourseDetailsById = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { courseId } = req.params;

	const course = await Course.find({
		_id: courseId,
		college: admin_id,
	}).populate({
		path: "branches",
		select: "name subjects",
		populate: {
			path: "subjects",
			select: "name code",
		},
	});

	if (!course) {
		return res.status(404).json(new ApiError(404, "Course with ID Not found"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, course, "Course Found Successfully"));
});

const getTotalCourseCount = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const courseCount = await Course.countDocuments({ college: admin_id });

	if (!courseCount) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Course Count fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, courseCount, "Course Count Fetched Successfully")
		);
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

const getListOfTeacherNames = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	if (!admin_id) {
		return res.status(400).json(new ApiError(400, "College ID Not Provided"));
	}

	const teachers = await Teacher.find({ college: admin_id }).select("fullName");

	if (!teachers) {
		return res
			.status(500)
			.json(new ApiError(500, "Teacher Fetching failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, teachers, "Teachers Fetched Successfully"));
});

const getTotalTeacherCount = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const teacherCount = await Teacher.countDocuments({ college: admin_id });

	if (!teacherCount) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Teacher Count fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, teacherCount, "Teacher Count Fetched Successfully")
		);
});

const getTeacherById = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const teacher = await Teacher.findById(id)
		.populate({ path: "teachCourses", select: "name" })
		.populate({ path: "teachSubjects", select: "name" })
		.populate({ path: "college", select: "college" })
		.select("-password -role ");

	if (!teacher) {
		return res.status(400).json(new ApiError(400, "Teacher with ID Not Found"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, teacher, "Teacher Found Successfully"));
});

const deleteTeacherById = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { teacherId } = req.params;

	const teacher = await Teacher.findByIdAndDelete(teacherId);

	if (!teacher) {
		return res
			.status(400)
			.json(new ApiError(400, "Teacher with id not found."));
	}

	await Subject.updateMany({ taughtBy: teacherId }, { taughtBy: null });

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Teacher Deleted Successfully"));
});

// 					********* 	SUBJECT RELATED CONTROLLERS *********

const createSubject = asyncHandler(async (req, res) => {
	const { name, code, courseId, branchId, teacherId, admin_id } = req.body;

	if (!name || !code || !courseId || !branchId || !teacherId) {
		return res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const isSubjectExists = await Subject.findOne({ name, college: admin_id });
	if (isSubjectExists) {
		return res.status(400).json(new ApiError(400, "Subject Already Exists"));
	}

	let coverImageLocalPath;

	if (req.file && req.file.path) {
		coverImageLocalPath = req.file.path;
	}

	const coverImageObject = await uploadOnCloudinary(coverImageLocalPath);

	if (!coverImageObject && !coverImageObject?.url) {
		return res
			.status(500)
			.json(new ApiError(500, "Image not Uploaded!! Please Retry"));
	}

	const newSubject = await Subject.create({
		name,
		code,
		course: courseId,
		branch: branchId,
		taughtBy: teacherId,
		coverImage: coverImageObject.url,
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
	if (teacher.teachCourses.includes(courseId) === false) {
		teacher.teachCourses.push(courseId);
	}
	await teacher.save();

	return res
		.status(200)
		.json(new ApiResponse(201, newSubject, "Subject Created Successfully"));
});

const getTotalSubjectCount = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const subjectCount = await Subject.countDocuments({ college: admin_id });

	if (!subjectCount) {
		return res
			.status(500)
			.json(
				new ApiError(500, "Subject Count fetching Failed due to server error")
			);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, subjectCount, "Subject Count Fetched Successfully")
		);
});

const getAllSubjects = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;

	const subjects = await Subject.find({ college: admin_id }).populate([
		{
			path: "course",
			select: "name",
		},
		{
			path: "branch",
			select: "name",
		},
		{
			path: "taughtBy",
			select: "fullName",
		},
	]);

	if (!subjects) {
		return res
			.status(500)
			.json(new ApiError(500, "Subjects Fetching failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, subjects, "Subjects Fetched Successfully"));
});

const changeSubjectTeacher = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { subjectId } = req.params;
	const { teacherId } = req.body;

	if (!subjectId || !teacherId) {
		return res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const subject = await Subject.findById(subjectId);
	const teacher = await Teacher.findById(teacherId);

	if (!subject) {
		return res.status(400).json(new ApiError(400, "Subject With Id not Found"));
	}

	if (!teacher) {
		return res
			.status(400)
			.json(new ApiError(400, "Invalid Teacher, Teacher doesn't Exist "));
	}

	subject.taughtBy = teacherId;

	if (!teacher.teachCourses.includes(subject.course)) {
		teacher.teachCourses.push(subject.course);
	}

	if (!teacher.teachSubjects.includes(subject._id)) {
		teacher.teachSubjects.push(subject._id);
	}

	await subject.save();
	await teacher.save();

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Subject Teacher Updated Successfully"));
});

// 					********* 	BRANCH RELATED CONTROLLERS *********

const getListOfBranchesByCourseId = asyncHandler(async (req, res) => {
	const admin_id = req.user_id;
	const { courseID } = req.params;

	const branches = await Branch.find({
		inCourse: courseID,
		college: admin_id,
	}).select("name");

	if (!branches) {
		return res
			.status(500)
			.json(new ApiError(500, "Branch Fetching Failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, branches, "Branches fetched successfully"));
});

// 					********* 	LIBRARY RELATED CONTROLLERS *********

const addResource = asyncHandler(async (req, res) => {
	const { name, file_url, admin_id } = req.body;

	if (!name || !file_url || !admin_id) {
		return res.status(400).json(new ApiError(400, "All fields are required"));
	}

	if (!req.file && !req.file?.path) {
		return res
			.status(400)
			.json(new ApiError(400, "Image Upload Failed, Please Retry"));
	}

	let localImagePath = req.file?.path;
	const imageObject = await uploadOnCloudinary(localImagePath);

	if (!imageObject && !imageObject?.url) {
		return res
			.status(500)
			.json(new ApiError(500, "Image not Uploaded!! Please Retry"));
	}

	const resource = await Library.create({
		name,
		file_url,
		image_url: imageObject.url,
		college: admin_id,
	});

	if (!resource) {
		return res.status(500).json(new ApiError(500, "Resource Creation failed"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, null, "Resource added successfully"));
});

export {
	adminLogin,
	createCourse,
	createTeacher,
	createSubject,
	createStudent,
	getAdminProfileDetails,
	getAllStudents,
	getAllTeachers,
	getAllCourses,
	getAllSubjects,
	getStudentById,
	getTeacherById,
	getCourseDetailsById,
	getListOfBranchesByCourseId,
	getListOfTeacherNames,
	getTotalStudentCount,
	getTotalTeacherCount,
	getTotalCourseCount,
	getTotalSubjectCount,
	deleteStudentById,
	deleteTeacherById,
	changeSubjectTeacher,
	addResource,
};
