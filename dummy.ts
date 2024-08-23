import { faker } from "@faker-js/faker";
import { Emoji } from "emoji-type";
import { Editorial, UserProfile, UserPost } from "./types";

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

export const dummyEditorials: Editorial[] = [];
for (let i = 0; i < 20; i++) {
	dummyEditorials.push({
		guest: faker.person.fullName(),
		timestamp: faker.date.past({ years: 1 }).toISOString(),
		coverUrl: faker.image.urlPlaceholder({ width: 128, height: 128 }),
		accountId: crypto.randomUUID()
	});
}

export const dummyUsers: UserProfile[] = []
for (let i = 0; i < 100; i++) {
	dummyUsers.push({
		id: crypto.randomUUID(),
		username: faker.word.words(2).split(" ").join(""),
		displayName: faker.person.firstName(),
		followingIds: [],
		blockedIds: [],
		joinedAt: faker.date.past({ years: 1 }).toISOString(),
		theme: {}
	})
}