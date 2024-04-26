import { FaSchool } from "react-icons/fa6";
function Navbar() {
	return (
		<div className="mx-8 my-4 bg-blue-900 p-4 rounded-md text-white flex justify-between text-lg">
			<h3 className="text-xl font-bold tracking-wider ml-4 flex items-center gap-2">
				ePaathShala
				<FaSchool />
			</h3>
			<div className="flex gap-6 mr-10">
				<h3>About</h3>
				<h3>Contact Us</h3>
				<h3>Login</h3>
			</div>
		</div>
	);
}

export default Navbar;
