import React from "react";
import AboutImage from "../assets/about.jpg";

import Navbar from "../components/Navbar.jsx";
import { Button } from "@nextui-org/react";

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
					<p className="tracking-wider px-4 text-lg my-4">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
						nemo ipsam aliquid? Dolorem autem perspiciatis saepe excepturi et!
						Quae, mollitia officia reprehenderit, tenetur adipisci vitae
						pariatur inventore distinctio illo ut nam deleniti aperiam ab
						perspiciatis. At ratione minus optio facilis animi corporis ipsam
						sed. Quo eum sequi quos necessitatibus iste iusto! Dolores
						consequatur perferendis id tempore quia consectetur quisquam quasi
						nemo doloremque ratione possimus dolor quis iusto, accusamus tempora
						suscipit architecto sint! Voluptatibus, natus? Molestiae ad culpa
						expedita dignissimos iure.
					</p>
					<Button
						variant="solid"
						className="my-4 w-1/2 text-md bg-yellow-400 rounded-sm">
						Get Started
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AboutPage;
