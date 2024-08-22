import { Metadata } from "next";
import { PostInput } from "../../components/PostInput";
import { Invites } from "../../components/Invites";
export const metadata: Metadata = {
	title: 'Home',
	description: 'Welcome to Next.js',
};

export default function Index() {
	return (
		<div className="flex flex-col p-8">
			<PostInput />
			<Invites />
		</div>
	);
}