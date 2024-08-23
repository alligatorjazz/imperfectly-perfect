import { Metadata } from "next";
import { getPosts } from "../../../lib/api";
import { SortableFeed } from "../../../components/SortableFeed";

export const metadata: Metadata = {
	title: 'PI.FYI | Everyone',
	description: "A Taste of YOUR Taste"
};

export default async function Everyone() {
	const posts = await getPosts();

	return (
		<>
			{posts && <SortableFeed posts={posts} />}
		</>
	);
}