import React from "react";

// redux related
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { CardHeader } from "@nextui-org/card";

import { User } from "@nextui-org/react";

// icons
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

function TabsNavbar({ tabName }) {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const navigator = useNavigate();

	const toastOptions = {
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	const logOutSession = () => {
		dispatch(logOut());
		toast.success("Logged Out Successfully", toastOptions);
		navigator("/");
	};
	return (
		<CardHeader className="flex justify-between">
			{tabName}
			<div className="flex items-center gap-4">
				<User
					name={user.fullName}
					description={user.email}
					avatarProps={{
						src: user.profileImage,
					}}
				/>
				<Button
					onClick={logOutSession}
					color="danger"
					variant="ghost"
					endContent={<MdLogout />}>
					Logout
				</Button>
			</div>
		</CardHeader>
	);
}

export default TabsNavbar;
