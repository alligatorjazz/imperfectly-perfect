import { Metadata } from "next";
import { PostInput } from "../../components/PostInput";
import { Invites } from "../../components/Invites";
import { WhatsHot } from "../../components/WhatsHot";
export const metadata: Metadata = {
	title: 'Home',
	description: 'Welcome to Next.js',
};

export default function Index() {
	return (
		<WhatsHot />
	);
}