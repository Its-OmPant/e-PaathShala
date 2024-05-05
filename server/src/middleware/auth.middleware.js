import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async (req, res, next) => {
	try {
		const reqToken = req
			.headers("Authorization")
			?.replace("Bearer ", "")
			.trim();

		if (!reqToken) {
			return res
				.status(400)
				.json(new ApiError(400, "Unauthorized HTTP Request", false));
		}

		const decryptedToken = jwt.verify(
			reqToken,
			process.env.JWT_TOKEN_SECRET_KEY
		);

		req.user_id = decryptedToken._id;
		next();
	} catch (error) {
		console.log("Auth Middleware Error :: ", error);
		throw new ApiError(500, "Something Unexpected Occured");
	}
};
