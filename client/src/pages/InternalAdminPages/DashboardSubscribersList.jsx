import React, { useEffect, useState } from "react";

// next UI components
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tooltip, Button } from "@nextui-org/react";
// images
import NoFound from "../../assets/no_data.jpg";

import { MdOutlineRefresh } from "react-icons/md";

import { toast } from "react-toastify";
function DashboardSubscribersList() {
	const toastOptions = {
		position: "bottom-right",
		pauseOnHover: false,
		autoClose: 2000,
		closeOnClick: true,
	};

	const [data, setData] = useState([]);

	// function to get list of subscribers
	const getData = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/internal/admin/subscribers/all`,
				{
					method: "GET",
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				const newData = data.data?.map((d) => ({
					...d,
					key: d._id,
				}));
				setData(newData);
			} else {
				const errData = await response.json();
				return toast.error(errData.message, toastOptions);
			}
		} catch (error) {
			console.log("CustomError:: ", error);
			toast.error("Something Unexpected Occured", toastOptions);
		}
	};

	const refresh = () => {
		getData();
		toast.success("Reloaded", toastOptions);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="justify-between">
				<h3 className="text-md font-semibold tracking-wide">
					Dashboard Subscribers List
				</h3>

				<Tooltip color="primary" content="Refresh">
					<Button onClick={refresh} color="primary">
						<MdOutlineRefresh size={22} />
					</Button>
				</Tooltip>
			</CardHeader>
			<CardBody>
				{data.length > 0 ? (
					<table>
						<thead>
							<tr className="flex justify-between text-slate-700 p-2 bg-yellow-200 rounded-md">
								<td className="w-1/5">Name</td>
								<td className="w-1/5">Email</td>
								<td className="w-1/5">School Name</td>
								<td className="w-1/5">Created At</td>
							</tr>
						</thead>
						<tbody>
							{data.map((d, index) => (
								<tr
									key={d.key}
									className="flex justify-between text-slate-700 hover:bg-slate-100 py-2 px-2 my-2 rounded-md">
									<td className="w-1/5">{d.fullName}</td>
									<td className="w-1/5">{d.email}</td>
									<td className="w-1/5">{d.schoolName}</td>
									<td className="w-1/5">{d.createdAt.slice(0, 10)}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="flex flex-col justify-center h-full items-center">
						<h2 className="text-xl text-red-500">No Data Available</h2>
						<img src={NoFound} width={300} alt="No Data Available" />
					</div>
				)}
			</CardBody>
		</Card>
	);
}

export default DashboardSubscribersList;
