import React from "react";
import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

import NotFound from "../assets/not_found.jpg";

function NotFoundPage() {
	return (
		<div className="min-h-screen max-h-screen overflow-hidden flex flex-col  justify-center items-center">
			<div className="flex flex-col items-center ">
				<h2 className="text-5xl text-red-700 text-center my-2">OOPS!</h2>
				<h3 className="text-xl font-bold my-3">
					The page you are trying to access doesn't exist
				</h3>
				<Link className="text-center p-2 mt-8 ounded-md shadow-md bg-red-100">
					{" "}
					Click to Go To Home Page
				</Link>
			</div>
			<div>
				<Image
					src={NotFound}
					width={700}
					alt="NextUI Album Cover"
					className="m-5"
				/>
			</div>
		</div>
	);
}

export default NotFoundPage;
