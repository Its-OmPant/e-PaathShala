import React, { useEffect, useState } from "react";
import Resource from "../../components/Resource";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import NoFound from "../../assets/no_data.jpg";

function StudentDigitalLibraryTab() {
	const user = useSelector((state) => state.auth.user);

	const [resources, setResources] = useState([]);

	const getAllResuorces = async (e) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/library/resource/all/${
					user.college
				}`
			);
			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				setResources(result.data);
			} else {
				const err = await response.json();
				console.error(err.message, toastOptions);
			}
		} catch (error) {
			console.error("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getAllResuorces();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Digital Library</h1>
			</CardHeader>
			<Divider></Divider>
			<CardBody>
				{resources && resources.length > 0 ? (
					<div className="grid grid-cols-5">
						{resources.map((r) => (
							<Link to={r.file_url} key={r._id} target="_blank">
								<Resource resName={r.name} imageUrl={r.image_url} />
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Courses Found</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				)}
			</CardBody>
		</Card>
	);
}

export default StudentDigitalLibraryTab;
