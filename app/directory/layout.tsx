import { MainTemplate } from "../_templates/Main";

export default function DirectoryLayout({ children, }: {
	children: React.ReactNode
}) {
	return (
		<MainTemplate >
			<div className="flex flex-col p-8">
				{children}
			</div>
		</MainTemplate>
	);
}