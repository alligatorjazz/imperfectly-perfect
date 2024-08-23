import { MainTemplate } from "../_templates/Main";


export default function SettingsLayout({ children, }: {
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