import { Invites } from "../../components/Invites";
import { LocalNav } from "../../components/LocalNav";
import { PostInput } from "../../components/PostInput";
import { MainTemplate } from "../_templates/Main";
import { NavLinks } from "../../types";
import "../globals.css";

const localLinks: NavLinks = [
	{ href: "/home", title: "Home" },
	// { href: "/home/following", title: "Friends" },
	{ href: "/home/everyone", title: "Everyone" }
];

export default function HomeLayout({ children, }: {
	children: React.ReactNode
}) {
	return (
		<MainTemplate>
			<div className="border-b border-dashed border-textColor">
				<LocalNav links={localLinks} />
			</div>
			<div className="flex flex-col p-8">
				<PostInput />
				<Invites />
				{children}
			</div>
		</MainTemplate>
	);
}