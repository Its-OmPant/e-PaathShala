import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
dotenv.config({ path: "./env" });

import { app } from "./app.js";
import connectDB from "./db/index.js";

const server = createServer(app);

const io = new Server(server, {
	cors: { origin: process.env.CORS_ORIGIN, credentials: true },
	pingTimeout: 60000,
});

connectDB()
	.then(() => {
		server.on("error", (error) => {
			console.log("Something Unexpected Happened, Error:: ", error);
			throw error;
		});

		server.listen(process.env.PORT || 3000, () => {
			console.log("Server Started on port ", process.env.PORT || 3000);
		});

		io.on("connection", (socket) => {
			console.log("Connected to socket.io");

			socket.on("configure", (user) => {
				socket.join(user.id);
				console.log("User " + user.id + "  Joined");
				socket.emit("connected");
			});

			socket.on("join_chat", (chat_id) => {
				socket.join(chat_id);
				console.log("User joined chat: ", chat_id);
			});

			socket.on("new_message", async (message) => {
				const chat = message.chatId;
				if (!chat.chatParticipents)
					return console.log("no chat participents found");

				chat.chatParticipents.forEach((user) => {
					socket.in(user).emit("new_message_receieved", message);
				});
			});
		});
	})
	.catch((error) => {
		console.log("\n************");
		console.log(error);
		console.log("\n ***********\n Exiting ...\n");
		process.exit(1);
	});
