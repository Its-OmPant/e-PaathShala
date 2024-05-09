import fs from "fs/promises";

// DB Models
import { MainAdmin } from "../models/mainAdmin.model.js";
import { Admin } from "../models/admin.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Contact } from "../models/contactUs.model.js";

// utilities
// import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/Nodemailer.js";

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
	const { fullName, email, schoolName } = req.body;

	if (!fullName || !email || !schoolName) {
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

	const admin = await Admin.create({
		fullName,
		email,
		schoolName,
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

	try {
		let htmlTemplate = await fs.readFile("./public/email.html", "utf-8");

		sendMail(email, {
			from: process.env.EMAIL,
			to: email,
			subject: "EPAATHSHALA SUBSCRIPTION GRANTED",
			html: htmlTemplate,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json(new ApiError(500, "something Unexpected Occured", false));
	}

	return res
		.status(200)
		.json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
});

// controller to save user data to register in subscription model
const saveNewAdminToRegister = asyncHandler(async (req, res) => {
	const { fullName, email, schoolName } = req.body;

	if (!fullName || !email || !schoolName) {
		res.status(400).json(new ApiError(400, "All Fields are Required", false));
	}

	// checking if user is already exist in subscription
	const isAlreadyRegistered = await Subscription.findOne({
		$or: [{ email }, { schoolName }],
	});

	if (isAlreadyRegistered) {
		return res
			.status(400)
			.json(new ApiError(400, "Email or School Name Already Exists", false));
	}

	// checking in Admin DB not in Subscription
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

	const temp_admin = await Subscription.create({ fullName, email, schoolName });

	if (!temp_admin) {
		return res
			.status(500)
			.json(
				new ApiError(
					500,
					"Failed to Save data, Internal server error Please retry after sometime"
				)
			);
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				201,
				null,
				"Success, We will get back to you once Registration is successful"
			)
		);
});

const getListOfAllSubscriptionRequests = asyncHandler(async (req, res) => {
	const data = await Subscription.find().select("-updatedAt");

	if (!data) {
		return res
			.status(500)
			.json(new ApiError(500, "Failed to fetch data, Internal server Error"));
	}

	return res.status(200).json(new ApiResponse(200, data, null));
});

// controller to fetch all Contacts from contacts model
const getAllContacts = asyncHandler(async (req, res) => {
	const allContacts = await Contact.find();
	if (!allContacts) {
		return res
			.status(500)
			.json(new ApiError(500, "Failed to fetch data, Internal server Error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, allContacts, "Contact Fetched Successfully"));
});

// controller to fetch all admins from admin model
const getAllSubscribers = asyncHandler(async (req, res) => {
	const allAdmins = await Admin.find().select("-password -role -profileImage");
	if (!allAdmins) {
		return res
			.status(500)
			.json(new ApiError(500, "Failed to fetch data, Internal server Error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, allAdmins, "Contact Fetched Successfully"));
});

export {
	mainAdminRegister,
	mainAdminLogin,
	newSchoolAdminRegister,
	saveNewAdminToRegister,
	getListOfAllSubscriptionRequests,
	getAllContacts,
	getAllSubscribers,
};
