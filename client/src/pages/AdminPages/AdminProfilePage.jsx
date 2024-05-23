import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// nextUI Components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";

// icons
import { MdArrowBack } from "react-icons/md";

function AdminProfilePage() {
	const params = useParams();
	const adminId = params.id;
	const [adminData, setAdminData] = useState();

	// const getAdminProfileData = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			`${import.meta.env.VITE_API_BASE_URL}/admin/profile/${adminId}`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"Content-type": "application/json",
	// 				},
	// 			}
	// 		);

	// 		console.log(response);
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setAdminData(data.data);
	// 		} else {
	// 			const err = await response.json();
	// 			console.log(err);
	// 			return;
	// 		}
	// 	} catch (error) {
	// 		console.log("customError :: ", error);
	// 	}
	// };

	// useEffect(() => {
	// 	getAdminProfileData();
	// }, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<Link to="/admin">
					<MdArrowBack />
				</Link>
				<h1>Admin Profile</h1>
			</CardHeader>
			<CardBody className="items-center">
				<div className="w-1/2 flex flex-col gap-4 items-center">
					<Avatar
						src={adminData?.profileImage}
						fallback={<FaRegUser size={45} />}
						className="w-[140px] h-[140px] bg-blue-200"></Avatar>
					<div className="w-4/5 grid gap-4 my-3">
						<Input type="text" label="Admin Name" color="primary"></Input>
						<Input type="email" label="Email" color="primary"></Input>
						<Input type="text" label="College" color="primary"></Input>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export default AdminProfilePage;
