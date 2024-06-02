import React from "react";

function Resource({ imageUrl, resName }) {
	return (
		<div className="m-2 bg-slate-200 px-2 py-1 rounded-md hover:scale-105 transition-all">
			<img src={imageUrl} alt="" className="w-[200px] h-[260px] rounded-md" />
			<p className="text-center text-md">{resName}</p>
		</div>
	);
}

export default Resource;
