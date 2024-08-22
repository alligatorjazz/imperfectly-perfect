import { LocalNav } from "../../components/LocalNav";
import { NavLinks } from "../../types";
import RootLayout from "../layout";

const localLinks: NavLinks = [
	{ href: "/home", title: "Home" },
	{ href: "/home/following", title: "Friends" },
	{ href: "/home/everyone", title: "Everyone" }
];

export default function HomeLayout({ children, }: {
	children: React.ReactNode
}) {
	return (
		<div>
			<div className="border-b border-dashed border-textColor">
				<LocalNav links={localLinks} />
			</div>
			{children}
		</div>
	);
}