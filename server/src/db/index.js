import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(
			`${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`
		);
		console.log("DB Connected, DB HOST :: ", connection.connection.host);
	} catch (error) {
		throw `Mongo DB Connection Failed , ERROR :: ${error}`;
	}
};

export default connectDB;
