import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { Button, Avatar } from "@nextui-org/react";

// icons
import { MdOutlineRefresh } from "react-icons/md";

import NoFound from "../../assets/no_data.jpg";

function CourseTab() {
	const user = useSelector((state) => state.auth.user);

	const [courses, setCourses] = useState([]);

	const getAllCourses = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/admin/courses/all`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${user.token}`,
					},
				}
			);

			// console.log(response);
			if (response.ok) {
				const result = await response.json();
				// console.log(result);
				setCourses(result.data);
			} else {
				const error = await response.json();
				toast.error(
					error.message || "Something Unexpected happened",
					toastOptions
				);
			}
		} catch (error) {
			console.log("CustomError:: ", error);
		}
	};

	const refresh = () => {
		getAllCourses();
		toast.success("Refreshed", toastOptions);
	};

	useEffect(() => {
		getAllCourses();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Courses</h1>
				<div className="flex justify-end gap-3">
					<Button onClick={refresh} color="secondary" isIconOnly>
						<MdOutlineRefresh size={18} />
					</Button>
					<Link to="add">
						<Button color="primary" radius="sm">
							Add new Course
						</Button>
					</Link>
				</div>
			</CardHeader>
			<Divider></Divider>
			{courses.length > 0 ? (
				<div className="grid grid-cols-4 gap-4 my-3">
					{courses.map((c) => (
						<Link to={c._id} key={c._id}>
							<Card>
								<img
									alt="Course Image"
									src={c.coverImage}
									className="w-[300px] h-[200px]"
								/>
								<CardFooter className="pt-0 justify-center">
									<h2 className="font-bold ">{c.name}</h2>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<div className="flex flex-col justify-center h-full items-center">
					<h2 className="text-xl text-red-500">No Courses Found</h2>
					<img src={NoFound} width={300} alt="No Data Available" />
				</div>
			)}
		</Card>
	);
}

export default CourseTab;
