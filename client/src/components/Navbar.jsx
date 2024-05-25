import { FaSchool } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

// redux related
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";

function Navbar() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const logoutSession = () => {
		dispatch(logOut());
		toast.success("Logged Out Successfully");
	};

	return (
		<div className="mx-8 my-4 bg-blue-900 p-4 rounded-md text-white flex justify-between text-lg">
			<h3 className="text-xl font-bold tracking-wider ml-4 flex items-center gap-2">
				ePaathShala
				<FaSchool />
			</h3>
			<div className="flex  items-center gap-10 mr-10">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/contact">Contact Us</NavLink>
				{user ? (
					<>
						{user.role != "mainAdmin" ? (
							<NavLink to={`/${user.role}`}>Dashboard </NavLink>
						) : (
							""
						)}

						<NavLink
							onClick={logoutSession}
							className="rounded-md px-3 bg-pink-700 py-1 text-white">
							Logout
						</NavLink>
					</>
				) : (
					<NavLink
						to="/login"
						className="rounded-md px-3 bg-pink-700 py-1 text-white">
						Login
					</NavLink>
				)}
			</div>
		</div>
	);
}

export default Navbar;
