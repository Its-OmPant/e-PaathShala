import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		college: {
			type: String,
			required: true,
		},
		isRegistered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Subscription = mongoose.model("subscription", subscriptionSchema);
