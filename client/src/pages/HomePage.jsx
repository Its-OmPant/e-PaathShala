import { Link } from "react-router-dom";

// redux related
import { useSelector } from "react-redux";

// nextUI Components
import { Button, Image } from "@nextui-org/react";

//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// images
import Home from "../assets/home.jpg";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";
import f3 from "../assets/f3.jpg";
import standing from "../assets/standing.png";

// icons
import { FaUniversity } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

function HomePage() {
	const user = useSelector((state) => state.auth.user);
	const name = user ? user.fullName : "There";
	return (
		<div className="min-h-screen bg-slate-300 py-2">
			{/* navbar */}
			<Navbar />

			{/* hero Section */}
			<div
				id="hero"
				className="flex justify-center items-center  pt-32 pb-20 bg-white rounded-md mx-8">
				<div id="left" className="w-1/2 flex justify-center">
					<div>
						<h3 className="text-xl my-4">Hii {name}, Welcome to</h3>
						<h1 className="text-8xl my-6 text-sky-500 font-extrabold">
							ePaathShala
						</h1>
						<p className="text-lg text-right">
							a place where learning meets technology
						</p>
						<Link to="/get-started">
							<Button className="bg-green-700 shadow-md w-full rounded-md px-4 py-2 text-white my-8 text-lg">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
				<div id="right" className="w-1/2 flex justify-center p-2">
					<Image src={Home} alt="Welcome Image" className="w-[90%]" />
				</div>
			</div>
			{/* hero section end */}

			{/* achievement section */}

			<div className="bg-white/85 rounded-md mx-8 my-4 p-4">
				<div className="text-center">
					<h2 className="text-3xl text-blue-900 font-bold my-3 ">
						Our Achievements
					</h2>
					<p>
						with our commitment towards quality education we have acheived this
					</p>
				</div>

				<div className="w-full flex justify-around my-6">
					<div className="w-[25%] border-2 shadow-sm border-blue-900 text-center py-4 rounded-md text-teal-500">
						<div className="text-4xl font-bold flex justify-center my-2 gap-2 items-center">
							<FaUniversity /> 125+
						</div>
						<p className="text-2xl">Universities</p>
					</div>
					<div className="w-[25%] border-2 shadow-sm border-blue-900 text-center py-4 rounded-md text-red-600">
						<div className="text-4xl font-bold flex justify-center my-2 gap-2 items-center">
							{" "}
							<FaRegIdCard /> 631+
						</div>
						<p className="text-2xl">Classrooms</p>
					</div>
					<div className="w-[25%] border-2 shadow-sm border-blue-900 text-center py-4 rounded-md text-yellow-700">
						<div className="text-4xl font-bold flex justify-center my-2 gap-2 items-center">
							{" "}
							<FaUserGraduate /> 20k+
						</div>
						<p className="text-2xl">Students</p>
					</div>
				</div>
			</div>

			{/* achievement section end*/}

			{/* features */}

			<div className="bg-white rounded-md mx-8 my-4 p-4">
				<div className="text-center">
					<h2 className="text-3xl text-blue-900 font-bold my-3 ">
						Powerful Features
					</h2>
					<p>
						Special features which help you keep students on track and engaged
						during class times
					</p>
				</div>

				<div id="feature1" className="w-full flex justify-center my-4">
					<div id="left" className="w-1/2 flex justify-center">
						<Image src={f1} alt="feature 1" className="w-4/5 rounded-md" />
					</div>

					<div id="right" className="w-1/3 flex flex-col justify-center">
						<h3 className="text-2xl font-semibold text-red-700 text-center my-3">
							Inbuilt Web Confrencing and Chat rooms
						</h3>
						<p className="text-center">
							So that you don’t need to depend on various external services and
							get everything at one place
						</p>
					</div>
				</div>

				<div id="feature2" className="w-full flex justify-center my-4">
					<div id="left" className="w-1/3 flex flex-col justify-center">
						<h3 className="text-2xl font-semibold text-green-700 text-center my-3">
							Assignments and Quiz
						</h3>
						<p className="text-center">
							Faculty can create an assignment or quiz in Classroom and also
							schedule it to post later,
						</p>
					</div>
					<div id="right" className="w-1/2 flex justify-end">
						<img
							src={f2}
							alt="feature 2"
							className="w-2/5 rounded-md justify-end"
						/>
					</div>
				</div>

				<div id="feature3" className="w-full flex justify-center my-4">
					<div id="left" className="w-1/2 flex justify-center">
						<Image src={f3} alt="feature 3" className="w-4/5 rounded-md" />
					</div>

					<div id="right" className="w-1/3 flex flex-col justify-center">
						<h3 className="text-2xl font-semibold text-violet-800 text-center my-3">
							Automatic Grading and Reporting
						</h3>
						<p className="text-center">
							It automatically grade the quiz and assignments, students can see
							their grades after the faculty reviews their answers
						</p>
					</div>
				</div>

				<p className="text-lg text-center">and many more ... </p>
			</div>

			{/* features end*/}

			{/* Reviews */}

			<div className="bg-white rounded-md mx-8 my-4 p-4">
				<div className="text-center">
					<h2 className="text-3xl text-pink-900 font-bold my-3 ">
						They all have loved us
					</h2>
					<p>We work with clients around the globe</p>
				</div>

				<div className="flex justify-center my-6 overflow-x-auto">
					<div
						id="review1"
						className="rounded-md shadow-md w-2/5 p-4 bg-pink-200 text-center my-4 mx-3 ">
						<h3 className="text-xl font-bold">Review Heading</h3>
						<p className="my-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
							aliquam. Nihil, odio. Quos repellat illum corrupti iusto odit
							corporis veniam placeat recusandae, neque et molestias?
						</p>
						<div className="flex justify-center gap-6 items-center text-left">
							<FaCircleUser className="text-4xl text-gray-500" />
							<div>
								<h3 className="font-semibold">Username</h3>
								<p>user bio that he has written</p>
							</div>
						</div>
					</div>
					<div
						id="review2"
						className="rounded-md shadow-md w-2/5 p-4 bg-teal-200 text-center my-4 mx-3">
						<h3 className="text-xl font-bold">Review Heading</h3>
						<p className="my-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
							aliquam. Nihil, odio. Quos repellat illum corrupti iusto odit
							corporis veniam placeat recusandae, neque et molestias?
						</p>
						<div className="flex justify-center gap-6 items-center text-left">
							<FaCircleUser className="text-4xl text-gray-500" />
							<div>
								<h3 className="font-semibold">Username</h3>
								<p>user bio that he has written</p>
							</div>
						</div>
					</div>
					<div
						id="review3"
						className="rounded-md shadow-md w-2/5 p-4 bg-yellow-200 text-center my-4 mx-3">
						<h3 className="text-xl font-bold">Review Heading</h3>
						<p className="my-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
							aliquam. Nihil, odio. Quos repellat illum corrupti iusto odit
							corporis veniam placeat recusandae, neque et molestias?
						</p>
						<div className="flex justify-center gap-6 items-center text-left">
							<FaCircleUser className="text-4xl text-gray-500" />
							<div>
								<h3 className="font-semibold">Username</h3>
								<p>user bio that he has written</p>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 h-60 mt-44 rounded-md relative flex flex-col justify-center items-center">
					<h2 className="text-4xl text-center text-white font-bold tracking-wide ">
						Ready to be more productive with ePaathShala?{" "}
					</h2>

					<Link to="/get-started">
						<Button
							color="warning"
							variant="ghost"
							className="rounded-md  px-6 py-2 text-white my-6">
							Get Started
						</Button>
					</Link>
					<img
						src={standing}
						alt=""
						className="absolute w-1/6 bottom-0 right-0"
					/>
				</div>
			</div>

			{/* Reviews End */}
			<Footer />
		</div>
	);
}

export default HomePage;
