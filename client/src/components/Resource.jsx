import React from "react";
import BookImg from "../assets/bookImage.jpg";

function Resource({ imageUrl, resName }) {
	return (
		<div className="m-2 bg-slate-200 px-2 py-1 rounded-md ">
			<img
				src={imageUrl || BookImg}
				alt=""
				className="w-[200px] h-[260px] rounded-md"
			/>
			<p className="text-center text-md">{resName}</p>
		</div>
	);
}

export default Resource;
