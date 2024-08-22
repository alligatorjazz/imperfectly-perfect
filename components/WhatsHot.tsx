import { Emoji } from "emoji-type";
import { UserPost } from "../types";
import { Header } from "./Header";
import { faker } from '@faker-js/faker';
import { PostList } from "./PostList";
import { join } from "path";

const dummyPosts: UserPost[] = [];
for (let i = 0; i < 50; i++) {
	dummyPosts.push({
		headline: faker.lorem.sentence(),
		body: Math.random() > 0.5 ? [faker.lorem.paragraph({ min: 1, max: 3 }), faker.lorem.paragraph({ min: 1, max: 3 })].join("\n") : undefined,
		image: Math.random() > 0.8 ? faker.image.urlLoremFlickr() : undefined,
		link: Math.random() > 0.8 ? faker.internet.url() : undefined,
		emoji: Math.random() > 0.6 ? faker.internet.emoji() as Emoji : undefined,
		timestamp: faker.date.past({ years: 1 }).toISOString(),
		authorId: crypto.randomUUID()
	})

}
export function WhatsHot() {
	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">What's Hot!</Header>
			<PostList posts={dummyPosts} />
		</div>
	);
}