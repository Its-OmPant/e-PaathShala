import React from "react";
import AboutImage from "../assets/about.jpg";

import Navbar from "../components/Navbar.jsx";
import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";

function AboutPage() {
	return (
		<div className="min-h-screen bg-slate-300 py-2">
			<Navbar />

			<div className="rounded-md my-4 mx-8 p-4 bg-white flex  py-10">
				<div className="w-1/2 p-4">
					<img src={AboutImage} alt="" className="w-full " />
				</div>
				<div className="w-1/2 flex flex-col items-center">
					<h2 className="my-4 text-3xl text-blue-900 font-bold text-center">
						About Us
					</h2>
					<p className="tracking-wider px-4 text-lg my-4 text-justify">
						ePaathShala is an innovative e-learning and student management
						system designed to streamline educational processes for
						institutions, teachers, students, and parents. With cutting-edge
						technology and user-friendly interfaces, ePaathShala aims to enhance
						the learning experience while simplifying administrative tasks
					</p>
					<p className="tracking-wider px-4 text-lg my-4 text-justify">
						ePaathShala is more than just a software platform; it's a catalyst
						for transforming education by leveraging technology to improve
						outcomes, enhance engagement, and empower stakeholders in the
						learning ecosystem. Join the ePaathShala revolution and unlock the
						full potential of education in the digital age.
					</p>
					<Link to="/get-started">
						<Button
							variant="solid"
							className="my-4 w-full text-md bg-yellow-400 rounded-sm">
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AboutPage;
