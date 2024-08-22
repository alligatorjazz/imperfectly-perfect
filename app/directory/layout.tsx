import { Header } from "../../components/Header";
import { PostList } from "../../components/PostList";
import { dummyPosts } from "../../dummy";
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