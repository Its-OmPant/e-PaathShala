import React from "react";

function SubjectCard({
	coverImageUrl,
	subjectName,
	subjectCode,
	courseName,
	branchName,
	teacherName,
}) {
	return (
		<div className="bg-slate-200 p-2 rounded-md hover:scale-105 transition-all">
			<img
				src={coverImageUrl}
				alt=""
				className="w-[280px] h-[170px] rounded-md"
			/>
			<div className="flex justify-between items-center px-2 py-1">
				<h1 className="text-center font-semibold text-lg truncate">
					{subjectName}
				</h1>
				<h3>{subjectCode}</h3>
			</div>
			<p className="truncate">Course: {courseName}</p>
			<p className="truncate">Branch: {branchName}</p>
			<p className="truncate">Taught By: {teacherName}</p>
		</div>
	);
}

export default SubjectCard;
