import dotenv from "dotenv";
dotenv.config({ path: "./env" });

import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
	.then(() => {
		app.on("error", (error) => {
			console.log("Something Unexpected Happened, Error:: ", error);
			throw error;
		});

		app.listen(process.env.PORT || 3000, () => {
			console.log("Server Started on port ", process.env.PORT || 3000);
		});
	})
	.catch((error) => {
		console.log("\n************");
		console.log(error);
		console.log("\n ***********\n Exiting ...\n");
		process.exit(1);
	});
