import { Metadata } from "next";
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