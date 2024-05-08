import { Contact } from "../models/contactUs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// controller to add new contact in contact model
const addContact = asyncHandler(async (req, res) => {
	const { fullName, email, description } = req.body;

	if (!fullName || !email || !description) {
		res.status(400).json(new ApiError(400, "All Fields are required"));
	}

	const newContact = await Contact.create({ fullName, email, description });

	if (!newContact) {
		res
			.status(500)
			.json(new ApiError(500, "Contact not saved due to server error"));
	}

	return res.status(201).json(new ApiResponse(201, null, "Message Recieved"));
});

// controller to delete a contact from contacts model
const deteleContact = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		res.status(400).json(new ApiError(400, "Contact ID is required"));
	}

	const isContactExist = await Contact.findById(id);

	if (!isContactExist) {
		res.status(400).json(new ApiError(400, "Contact with id doesn't exist"));
	}

	const deletedContact = await Contact.findByIdAndDelete(id);

	if (!deletedContact) {
		res
			.status(500)
			.json(new ApiError(500, "Contact Deletion failed due to server error"));
	}
	return res
		.status(200)
		.json(new ApiResponse(200, null, "Contact Deleted Successfully"));
});

export { addContact, deteleContact };
