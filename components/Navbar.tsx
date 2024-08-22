"use client";
import { Logo } from "./Logo";
import { FiMenu } from "react-icons/fi";
import { NavDrawer } from "./NavDrawer";
import { useState } from "react";
import { NavLinks } from "../types";


interface Props {
	links: NavLinks
}

export function Navbar({ links }: Props) {
	const [drawerActive, setDrawerActive] = useState(false);

	return (<>
		<header className={[
			"w-full flex justify-between",
			"px-3 py-5",
			"border-b border-dashed border-b-textColor"
		].join(" ")}>
			<div className="hover:cursor-pointer" onClick={() => setDrawerActive(prev => !prev)}>
				<FiMenu size={20} />
			</div>
			<Logo className="flex justify-center flex-1" />
			<div className="w-[20px]"></div>
		</header>
		<NavDrawer
			active={drawerActive}
			setActive={setDrawerActive}
			links={links}
		/>
	</>
	);
}