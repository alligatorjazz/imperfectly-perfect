import { Metadata } from "next";
import { getPosts } from "../../../lib/api";
import { PostList } from "../../../components/PostList";

export const metadata: Metadata = {
	title: 'PI.FYI | Everyone',
	description: "A Taste of YOUR Taste"
};

export default async function Everyone() {
	const posts = await getPosts();

	return (
		<>
			{posts && <PostList posts={posts} />}
		</>
	);
}