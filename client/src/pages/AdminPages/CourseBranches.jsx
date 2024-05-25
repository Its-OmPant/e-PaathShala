import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

import { useSelector } from "react-redux";
// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider, Button } from "@nextui-org/react";

// icons
import { MdArrowBack } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";

function CourseBranches() {
	const params = useParams();
	const user = useSelector((state) => state.auth.user);
	const courseId = params.id;

	const [courseDetails, setCourseDetails] = useState([
		{
			branches: [],
			name: "",
			coverImage: "",
		},
	]);

	const [selectedBranch, setSelectedBranch] = useState(null);

	const getCourseDetails = async (e) => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/courses/${courseId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			// console.log(response);

			if (response.ok) {
				const result = await response.json();
				console.log(result.data[0]);
				setCourseDetails(result.data[0]);
			}
		} catch (error) {
			console.log("CustomError :: ", error);
		}
	};

	useEffect(() => {
		getCourseDetails();
	}, []);

	const selectBranch = (e) => {
		const branch = courseDetails.branches.find((b) => b._id === e.target.id);
		setSelectedBranch(branch);
	};

	const refresh = () => {
		getCourseDetails();
		toast.success("Reloaded", toastOptions);
	};

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3 justify-between">
				<div className="flex gap-4 items-center">
					<Link to="/admin/courses">
						<MdArrowBack size={22} />
					</Link>
					<h1>Course Details</h1>
				</div>
				<div className="flex justify-end gap-3">
					<Button onClick={refresh} color="secondary" isIconOnly>
						<MdOutlineRefresh size={18} />
					</Button>
					<Link to="branch/add">
						<Button color="warning" radius="sm">
							Add Branch
						</Button>
					</Link>
					<Link to="subject/add">
						<Button color="success" radius="sm">
							Add Subject
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardBody className="flex flex-row gap-3">
				{/* left Card */}
				<Card shadow="none" className="bg-slate-200 w-1/4 h-full">
					<CardBody>
						<Image
							width={300}
							alt="NextUI hero Image"
							src={courseDetails.coverImage}
						/>
						<CardFooter className="flex-col items-start">
							<h2 className="text-center w-full font-bold">
								{courseDetails.name}
							</h2>
							<p className="my-3">Available Branches</p>
							<div className="w-full pr-3 flex flex-col gap-3 overflow-auto overflow-x-hidden">
								{courseDetails.branches?.map((b) => (
									<Button
										onClick={selectBranch}
										key={b._id}
										id={b._id}
										className="p-3 rounded-md bg-white">
										{b.name}
									</Button>
								))}
							</div>
						</CardFooter>
					</CardBody>
				</Card>

				{/* Right Card */}
				{selectedBranch ? (
					<Card shadow="none" className="bg-slate-200 w-3/4">
						<CardBody>
							<h1 className="text-lg font-semibold text-center my-2">
								{selectedBranch.name} Subjects
							</h1>

							{selectedBranch.subjects?.length > 0 ? (
								selectedBranch.subjects?.map((b) => (
									<div className="grid grid-cols-3 gap-3 my-4">
										<div className="p-3 rounded-md bg-white">{b.name}</div>
									</div>
								))
							) : (
								<h1 className="text-center my-10 text-red-500">
									No Subjects Found
								</h1>
							)}
						</CardBody>
					</Card>
				) : (
					<Card shadow="none" className="bg-slate-200 w-3/4">
						<CardBody>
							<h1>Please select a branch to see all subjects</h1>
						</CardBody>
					</Card>
				)}
			</CardBody>
		</Card>
	);
}

export default CourseBranches;
