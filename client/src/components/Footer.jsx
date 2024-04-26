import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoIosAppstore } from "react-icons/io";

function Footer() {
	return (
		<div className="bg-blue-900 rounded-md mx-8 my-4 p-4 text-white flex justify-between">
			<div className="ml-10">
				<h2 className="text-3xl font-bold my-4">ePaathShala</h2>
				<h4>Get In Touch</h4>
				<div className="flex gap-4 my-2 text-2xl">
					<FaFacebook />
					<FaInstagram />
					<FaLinkedin />
					<FaXTwitter />
				</div>
			</div>

			<div className="flex gap-16 mr-10">
				<div>
					<h3 className="font-bold my-3">Support</h3>
					<p className="my-1">Help Desk</p>
					<p className="my-1">Contact Us</p>
					<p className="my-1">Privacy Center</p>
					<p className="my-1">FAQ</p>
				</div>
				<div className="flex flex-col">
					<h3 className="font-bold my-3">Available on </h3>
					<button className="bg-white text-black px-6 py-2 rounded-md my-3 flex items-center gap-3 text-lg">
						<IoLogoGooglePlaystore /> Play Store
					</button>
					<button className="bg-white text-black px-6 py-2 rounded-md my-3 flex items-center gap-3 text-lg">
						{" "}
						<IoIosAppstore /> App Store
					</button>
				</div>
			</div>
		</div>
	);
}

export default Footer;
