import { faker } from "@faker-js/faker";
import { Emoji } from "emoji-type";
import { UserPost } from "./types";

export const dummyPosts: UserPost[] = [];
for (let i = 0; i < 50; i++) {
	dummyPosts.push({
		headline: faker.lorem.sentence(),
		body: Math.random() > 0.5 ? [faker.lorem.paragraph({ min: 1, max: 3 }), faker.lorem.paragraph({ min: 1, max: 3 })].join("\n") : undefined,
		image: Math.random() > 0.8 ? faker.image.urlLoremFlickr() : undefined,
		link: Math.random() > 0.8 ? faker.internet.url() : undefined,
		emoji: Math.random() > 0.6 ? faker.internet.emoji() as Emoji : undefined,
		timestamp: faker.date.past({ years: 1 }).toISOString(),
		authorId: crypto.randomUUID()
	});

}