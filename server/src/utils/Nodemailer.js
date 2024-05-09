import nodemailer from "nodemailer";

const config = {
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
};

const sendMail = (receiverEmail, data) => {
	const transporter = nodemailer.createTransport(config);
	transporter.sendMail(data, (err, info) => {
		if (err) {
			console.log("Error at Nodemailer Utility , Error ::", err);
			throw err;
		} else {
			return info;
		}
	});
};

export { sendMail };
