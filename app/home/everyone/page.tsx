import { Metadata } from "next";
import { PostInput } from "../../../components/PostInput";
import { Invites } from "../../../components/Invites";
import { WhatsHot } from "../../../components/WhatsHot";
import { SortableFeed } from "../../../components/SortableFeed";
export const metadata: Metadata = {
	title: 'PI.FYI | Everyone',
	description: "A Taste of YOUR Taste"
};

export default function Everyone() {
	return (
		<SortableFeed />
	);
}