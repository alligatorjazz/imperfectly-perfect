import { faker } from '@faker-js/faker';
import { Header } from "./Header";
import { PostList } from "./PostList";
import { getPosts } from '../lib/api';


export async function WhatsHot() {
	const posts = await getPosts({
		after: faker.date.recent(),
		limit: 20,
		original: true
	});

	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">{"What's hot!"}</Header>
			{posts && <PostList posts={posts} />}
		</div>
	);
}