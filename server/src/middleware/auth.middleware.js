import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
	try {
		const reqToken = req.header("Authorization")?.replace("Bearer ", "").trim();

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
		req.user_role = decryptedToken.role;
		next();
	} catch (error) {
		console.log("Auth Middleware Error :: ", error);
		throw new ApiError(500, "Something Unexpected Occured");
	}
};
