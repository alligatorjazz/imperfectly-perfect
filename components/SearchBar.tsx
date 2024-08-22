import { HTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";



export function SearchBar({className, ...props}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={["border border-textColor p-2 flex items-center gap-1 font-sans", className].join(" ")} {...props}>
			<FiSearch />
			<input type="text" placeholder="Search..." className="flex-1 bg-bgColor" />
		</div>
	);
}