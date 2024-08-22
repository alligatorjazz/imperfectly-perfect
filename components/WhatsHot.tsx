import { Emoji } from "emoji-type";
import { UserPost } from "../types";
import { Header } from "./Header";
import { faker } from '@faker-js/faker';
import { PostList } from "./PostList";
import { join } from "path";
import { dummyPosts } from "../dummy";


export function WhatsHot() {
	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">{"What's hot?"}</Header>
			<PostList posts={dummyPosts} />
		</div>
	);
}