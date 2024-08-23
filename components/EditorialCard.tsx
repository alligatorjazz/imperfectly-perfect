import { HTMLAttributes } from "react";
import { Editorial } from "../types";
import Image from "next/image";
import dayjs from "dayjs";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
	editorial: Editorial;
}

export function EditorialCard({ editorial, className, ...props }: Props) {
	return (
		<a href="/editorial/dummy" className={["flex flex-col gap-2", className].join(" ")} {...props}>
			<Image
				src={editorial.cover}
				alt={`A picture of ${editorial.guest}`}
				width={128}
				height={128}
				className="w-full"
			/>
			<div className="flex flex-col items-center border-y border-y-textColor border-dashed p-2">
				<a href="/editorials/dummy" className="font-bold text-lg uppercase overflow-ellipsis">{editorial.guest}</a>
				<p className="font-secondary">{dayjs(editorial.created_at).format("MMMM DD, YYYY")}</p>
			</div>
		</a>
	);
}