import React from "react";
import { Radio, cn } from "@nextui-org/react";

const CustomRadio = (props) => {
	const { children, ...otherProps } = props;

	return (
		<Radio
			{...otherProps}
			classNames={{
				base: cn(
					"inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between m-2 ",
					"flex-row-reverse w-[240px] h-[100px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary"
				),
			}}>
			{children}
		</Radio>
	);
};

export default CustomRadio;

// "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
// 					"flex-row-reverse max-w-[200px] h-[120px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
// 					"data-[selected=true]:border-primary"
