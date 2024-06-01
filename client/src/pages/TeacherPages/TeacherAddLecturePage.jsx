import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

// next ui components
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

// icons
import { MdArrowBack } from "react-icons/md";

import { toast } from "react-toastify";
import { toastOptions } from "../../Constants.js";

function TeacherAddLecturePage() {
	const user = useSelector((state) => state.auth.user);

	const navigate = useNavigate();
	const params = useParams();

	const subjectId = params.subjectId;
	const [video, setVideo] = useState(null);
	const [loading, setLoading] = useState(false);

	const [chapterOptions, setChapterOptions] = useState();

	const [userInput, setUserInput] = useState({
		lectureName: "",
		lectureNo: 0,
		chapterId: "",
	});

	const handleUserInputChange = (e) => {
		setUserInput({ ...userInput, [e.target.name]: e.target.value });
	};

	const getChapterOptions = async () => {
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/teacher/subjects/${subjectId}/chapters/all`,
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
				// console.log(result);
				setChapterOptions(result.data.content);
			}
		} catch (error) {
			toast.error("Something unexpected Occured ", toastOptions);
			console.log("Custom Error :: ", error);
		}
	};

	const uploadFile = async (timestamp, signature) => {
		const data = new FormData();
		data.append("file", video);
		data.append("timestamp", timestamp);
		data.append("signature", signature);
		data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
		data.append("folder", "videos");

		try {
			let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
			let resourceType = "video";
			let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

			const response = await fetch(api, {
				method: "POST",
				body: data,
			});
			// console.log(response);

			const result = await response.json();

			return result.secure_url || null;
		} catch (error) {
			console.error(error);
		}
	};

	const getSignatureForUpload = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/sign-upload`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ folder: "videos" }),
				}
			);

			const result = await response.json();
			console.log("generate signature -> ", result);

			// const res = await axios.post(
			// 	`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`,
			// 	{ folder }
			// );
			return result;
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!userInput.chapterId ||
			!userInput.lectureName ||
			!userInput.lectureNo ||
			!video
		) {
			toast.error("All Fields are required", toastOptions);
			return;
		}

		try {
			setLoading(true);

			// Get signature for video upload
			const { timestamp, signature } = await getSignatureForUpload();

			// Upload video file
			const videoUrl = await uploadFile(timestamp, signature);

			// console.log("video uploaded @  :: ", videoUrl);

			if (!videoUrl) {
				toast.error("Video Upload Failed, Please Retry");
			}

			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/teacher/lecture/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ videoUrl, ...userInput }),
				}
			);

			// console.log(response);
			if (response.ok) {
				const data = await response.json();
				toast.success(data.message, toastOptions);
			} else {
				const err = await response.json();
				toast.error(
					err?.message || "Something Unexpected Occured",
					toastOptions
				);
			}
			// Reset states
			setVideo(null);
			console.log("File upload success!");
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getChapterOptions();
	}, []);

	return (
		<Card className="w-4/5 p-3">
			<CardHeader className="gap-3">
				<MdArrowBack
					size={20}
					onClick={() => {
						navigate(-1);
					}}
				/>
				<h1 className="text-lg font-bold uppercase tracking-wide">
					Add Lecture
				</h1>
			</CardHeader>
			<CardBody>
				<Card className="w-3/5 bg-blue-200 h-full mx-auto p-4" shadow="none">
					{video ? (
						<video className="h-[280px] w-full" controls>
							<source src={URL.createObjectURL(video)} />
						</video>
					) : (
						<div className="w-full h-[280px] rounded-md bg-white"></div>
					)}

					<div className="flex gap-6 justify-center my-4">
						{" "}
						<label htmlFor="video" className="text-lg font-semibold">
							Select Lecture Video :
						</label>
						<input
							id="video"
							type="file"
							accept="video/*"
							onChange={(e) => setVideo((prev) => e.target.files[0])}
						/>
					</div>

					<Select
						isRequired
						label="Select Chapter"
						className="my-1"
						name="chapterId"
						value={userInput.chapterId}
						onChange={handleUserInputChange}>
						{chapterOptions && chapterOptions?.length > 0 ? (
							chapterOptions.map((chapter) => (
								<SelectItem
									key={chapter._id}
									value={
										chapter._id
									}>{`${chapter.chapterNo} ${chapter.chapterName} `}</SelectItem>
							))
						) : (
							<SelectItem>
								No Chapters Found Kindly add some before adding lectures
							</SelectItem>
						)}
					</Select>

					<Input
						type="number"
						min={1}
						label="Lecture Number"
						className="my-1 "
						isRequired
						name="lectureNo"
						value={userInput.lectureNo}
						onChange={handleUserInputChange}
					/>
					<Input
						type="text"
						label="Lecture Name"
						className="my-1 "
						isRequired
						name="lectureName"
						value={userInput.lectureName}
						onChange={handleUserInputChange}
					/>

					<Button color="danger" className="my-2" onClick={handleSubmit}>
						Create Lecture
					</Button>
				</Card>
			</CardBody>
		</Card>
	);
}

export default TeacherAddLecturePage;
