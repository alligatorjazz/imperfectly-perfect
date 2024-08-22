import { Invites } from "../../components/Invites";
import { LocalNav } from "../../components/LocalNav";
import { PostInput } from "../../components/PostInput";
import { MainTemplate } from "../_templates/Main";
import { NavLinks } from "../../types";


export default function ProfileLayout({ children, }: {
	children: React.ReactNode
}) {
	return (
		<MainTemplate>
			<div className="flex flex-col p-8">
				{children}
			</div>
		</MainTemplate>
	);
}