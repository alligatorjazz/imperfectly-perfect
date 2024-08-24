import { Header } from "./Header";
import { PostList } from "./PostList";
import { getPosts } from '../lib/api';


export async function WhatsHot() {
	const posts = await getPosts({
		original: true,
		limit: 25
	});

	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">{"What's hot!"}</Header>
			{posts && <PostList posts={posts} next={{ original: true, limit: 10 }} />}
		</div>
	);
}