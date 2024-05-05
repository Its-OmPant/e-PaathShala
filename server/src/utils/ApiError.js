class ApiError {
	constructor(statusCode, message, success = false, data = null) {
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
		this.success = statusCode < 400;
	}
}

export { ApiError };

// class ApiError extends Error {
// 	constructor(
// 		statusCode,
// 		message = "Something Went Wrong",
// 		errors = [],
// 		stack = ""
// 	) {
// 		super(message);
// 		this.message = message;
// 		this.statusCode = statusCode;
// 		this.data = null;
// 		this.success = false;
// 		this.errors = errors;

// 		if (stack) {
// 			this.stack = stack;
// 		} else {
// 			Error.captureStackTrace(this, this.constructor);
// 		}
// 	}
// }

// export { ApiError };
