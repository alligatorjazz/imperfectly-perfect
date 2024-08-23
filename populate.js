import { faker } from "@faker-js/faker";
import { Emoji } from "emoji-type";
import { Editorial, UserAccount, UserPost } from "ip.btw-types";
import { db } from "../ip.btw/src/db";
import { randomUUID } from "crypto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function randomFrom(array: any[]) {
	return array[Math.floor(Math.random() * array.length)];
}

export const dummyUsers: UserAccount[] = [];
for (let i = 0; i < 100; i++) {
	dummyUsers.push({
		id: randomUUID(),
		username: faker.word.words(2).split(" ").join(""),
		displayName: faker.person.firstName(),
		followingIds: new Array(Math.floor(30 * Math.random())).fill(null).map(() => randomFrom(dummyUsers).id),
		blockedIds: Math.random() > 0.95 ? [randomFrom(dummyUsers).id] : [],
		joinedAt: faker.date.past({ years: 1 }).toISOString(),
		theme: {}
	});
}

export const dummyPosts: UserPost[] = [];
for (let i = 0; i < 300; i++) {


	const post = Math.random() > 0.6 ? {
		id: randomUUID(),
		headline: faker.lorem.sentence(),
		body: Math.random() > 0.5 ? [faker.lorem.paragraph({ min: 1, max: 3 }), faker.lorem.paragraph({ min: 1, max: 3 })].join("\n") : undefined,
		image: Math.random() > 0.8 ? faker.image.urlLoremFlickr() : undefined,
		link: Math.random() > 0.8 ? faker.internet.url() : undefined,
		emoji: Math.random() > 0.6 ? faker.internet.emoji() as Emoji : undefined,
		timestamp: faker.date.past({ years: 1 }).toISOString(),
		authorId: randomUUID(),
		reRec: false,
	} : {
		id: randomFrom(dummyPosts.filter(post => !post.reRec)).id,
		reRec: true,
		recommender: randomFrom(dummyUsers).id
	};

	dummyPosts.push(post as unknown as UserPost);
}

export const dummyEditorials: Editorial[] = [];
for (let i = 0; i < 20; i++) {
	const editorial = {
		guest: faker.person.fullName(),
		timestamp: faker.date.past({ years: 1 }).toISOString(),
		coverUrl: faker.image.urlPlaceholder({ width: 128, height: 128 }),
		accountId: randomFrom(dummyUsers).id
	};
	dummyEditorials.push(editorial);
}

db.data.users = dummyUsers;
db.data.posts = dummyPosts;
db.data.editorials = dummyEditorials;

await db.write();
console.log("wrote dummy data to db");

