import Link from "next/link";
import { Logo } from "./Logo";
import { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import { NavLinks } from "../types";
import { isExternalURL } from "../lib/utils";

interface Props {
	active: boolean,
	setActive: Dispatch<SetStateAction<boolean>>
	links: NavLinks
}
export function NavDrawer({ active, setActive, links }: Props) {
	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen z-40 bg-bgColor"
			style={active ? {} : { display: "none" }}
		>
			<div className="px-7 py-4 flex justify-between items-center">
				<Link href="/home">
					<Logo scale={1.5} />
				</Link>
				<div className="p-1 rounded-md transition-all hover:cursor-pointer hover:backdrop-brightness-90" onClick={() => setActive(false)}>
					<FiX size={20} />
				</div>
			</div>
			<nav className="px-6 py-8 font-bold uppercase text-xl flex flex-col gap-2">
				{links.map(({ href, title }) => (
					<Link
						key={href}
						href={href}
						onClick={() => setActive(false)}
						className={isExternalURL(href) ? "text-primary opacity-50 hover:opacity-100" : "hover:text-primary"}
					>
						{title}
					</Link>
				))}
			</nav>
		</div>
	);
}