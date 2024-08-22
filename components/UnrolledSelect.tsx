import { HTMLAttributes } from "react";
import { SortCategories } from "../types";

export function UnrolledSelect({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={["flex flex-wrap justify-center gap-2", className].join(" ")}>
			{SortCategories.map(category => (
				<button className="p-1 border border-dashed border-textColor uppercase font-bold" key={category.emoji + category.title}>{`${category.emoji} ${category.title}`}</button>
			))}
		</div>
	);
}