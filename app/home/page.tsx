import { Metadata } from "next";
import Link from "next/link";
import { NavLinks } from "../../types";
import { LocalNav } from "../../components/LocalNav";

export const metadata: Metadata = {
	title: 'Home',
	description: 'Welcome to Next.js',
};

const localLinks: NavLinks = [
	{ href: "/home", title: "Home" },
	{ href: "/home/following", title: "Friends" },
	{ href: "/home/everyone", title: "Everyone" }
];
export default function Index() {
	return (
		<div className="flex flex-col">
			<div className="border-b border-dashed border-textColor">
				<LocalNav links={localLinks}/>
			</div>
		</div>
	);
}