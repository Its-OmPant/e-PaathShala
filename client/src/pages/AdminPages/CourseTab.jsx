import React from "react";

import { Link } from "react-router-dom";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { Button, Avatar } from "@nextui-org/react";

// icons
import { MdOutlineRefresh } from "react-icons/md";

function CourseTab() {
	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h1 className="font-bold uppercase">Courses</h1>
				<div className="flex justify-end gap-3">
					<Button color="secondary" isIconOnly>
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
			<div className="grid grid-cols-4 gap-4 my-3">
				<Link to="1">
					<Card>
						<CardBody>
							<Image
								isZoomed
								width={300}
								alt="NextUI hero Image"
								src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
							/>
						</CardBody>
						<CardFooter className="pt-0 justify-center">
							<h2 className="font-bold ">Bachelors of Technology</h2>
						</CardFooter>
					</Card>
				</Link>

				<Link to="2">
					<Card>
						<CardBody>
							<Image
								isZoomed
								width={300}
								alt="NextUI hero Image"
								src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
							/>
						</CardBody>
						<CardFooter className="pt-0 justify-center">
							<h2 className="font-bold ">Bachelors of Science </h2>
						</CardFooter>
					</Card>
				</Link>
			</div>
		</Card>
	);
}

export default CourseTab;
