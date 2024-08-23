import { MainTemplate } from "../_templates/Main";
import "./editorial.css";
export default function EditorialLayout({ children, }: {
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