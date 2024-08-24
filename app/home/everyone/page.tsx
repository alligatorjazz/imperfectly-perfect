import { Metadata } from "next";
import { getPosts } from "../../../lib/api";
import { PostList } from "../../../components/PostList";
import dayjs from "dayjs";

export const metadata: Metadata = {
	title: 'PI.FYI | Everyone',
	description: "A Taste of YOUR Taste"
};

export default async function Everyone() {
	const posts = await getPosts({ limit: 25, before: dayjs().add(7, "day").toISOString(), after: dayjs().subtract(1, "month").toISOString() });

	return (
		<>
			{posts && <PostList posts={posts} next={{ limit: 10}} />}
		</>
	);
}