"use client";
import { HTMLAttributes, useEffect } from "react";
import { NavLinks } from "../types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocalNav({ links, className, ...props }: { links: NavLinks } & HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname();

	return <nav className={[
		"flex flex-row justify-between items-center py-3 text-2xl", className
	].join(" ")} {...props}>
		{links.map(({ href, title }) => (
			<Link
				key={href}
				href={href}
				className={[
					"text-2xl font-bold text-secondary uppercase text-stroke-thin text-stroke-tertiary flex-1 text-center",
					pathname === href ? "text-4xl" : ""
				].join(" ")}
			>
				{title}
			</Link>
		))}
	</nav>;
}	
