import { Header } from "../../components/Header";
import { PostList } from "../../components/PostList";
import { SearchBar } from "../../components/SearchBar";
import { UnrolledSelect } from "../../components/UnrolledSelect";
import { getPosts } from "../../lib/api";

export default async function Browse() {
	const posts = await getPosts();
	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">{"Browse all"}</Header>
			<SearchBar className="mb-8"/>
			<UnrolledSelect className="mb-8"/>
			{posts && <PostList posts={posts} />}
		</div>
	);
}