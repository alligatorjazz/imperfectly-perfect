"use client";
import { HTMLAttributes, useEffect } from "react";
import { NavLinks } from "../types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function LocalNav({ links, className, ...props }: { links: NavLinks } & HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname();

	return <nav className={[
		"flex flex-row justify-between items-center py-3 text-xl md:text-2xl cursor-pointer", className
	].join(" ")} {...props}>
		{links.map(({ href, title }) => (
			<Link
				key={href}
				href={href}
				className={[
					"flex-1 text-center",
					pathname === href ? "text-4xl" : ""
				].join(" ")}
			>
				<Header>{title}</Header>
			</Link>
		))}
	</nav>;
}	
