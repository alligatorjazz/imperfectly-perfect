import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { createObjectCsvWriter } from "csv-writer";
function randomFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

const dummyUsers = [];
for (let i = 0; i < 200; i++) {
	dummyUsers.push({
		id: "user:" + randomUUID(),
		username: faker.word.words(2).split(" ").join(""),
		display_name: faker.person.firstName(),
		following: i > 0 ? new Array(Math.floor(30 * Math.random())).fill(null).map(() => randomFrom(dummyUsers).id) : [],
		blocked: (Math.random() > 0.95 && i > 0) ? [randomFrom(dummyUsers).id] : [],
		created_at: faker.date.past({ years: 1 }).toISOString()
	});
}

const dummyPosts = [];
for (let i = 0; i < 1000; i++) {
	const post = (Math.random() > 0.4 && i > 0) ? {
		id: "repost:" + randomUUID(),
		headline: faker.lorem.sentence(),
		body: undefined,
		image: undefined,
		link: undefined,
		emoji: undefined,
		created_at: faker.date.past({ years: 1 }).toISOString(),
		repost: randomFrom(dummyPosts.filter(post => !post.reRec)).id,
		author: randomFrom(dummyUsers).id
	} : {
		id: "post:" + randomUUID(),
		headline: faker.lorem.sentence(),
		body: Math.random() > 0.5 ? [faker.lorem.paragraph({ min: 1, max: 3 }), faker.lorem.paragraph({ min: 1, max: 3 })].join("\n") : undefined,
		image: Math.random() > 0.8 ? faker.image.urlLoremFlickr() : undefined,
		link: Math.random() > 0.8 ? faker.internet.url() : undefined,
		emoji: Math.random() > 0.6 ? faker.internet.emoji() : undefined,
		created_at: faker.date.past({ years: 1 }).toISOString(),
		repost: undefined,
		author: randomFrom(dummyUsers).id
	};

	dummyPosts.push(post);
}

const dummyEditorials = [];
for (let i = 0; i < 20; i++) {
	const editorial = {
		id: "editorial:" + randomUUID(),
		guest: faker.person.fullName(),
		created_at: faker.date.past({ years: 1 }).toISOString(),
		cover: faker.image.urlPlaceholder({ width: 128, height: 128 }),
		account: randomFrom(dummyUsers).id
	};
	dummyEditorials.push(editorial);
}

const userCsvWriter = createObjectCsvWriter({
	path: 'dummyUsers.csv',
	header: Object.keys(dummyUsers[0]).map(key => ({ id: key, title: key }))
});

const postCsvWriter = createObjectCsvWriter({
	path: 'dummyPosts.csv',
	header: Object.keys(dummyPosts[0]).map(key => ({ id: key, title: key }))
});

const editorialCsvWriter = createObjectCsvWriter({
	path: 'dummyEditorials.csv',
	header: Object.keys(dummyEditorials[0]).map(key => ({ id: key, title: key }))
});

// Write CSV files
(async () => {
	await userCsvWriter.writeRecords(dummyUsers);
	console.log("Dummy users data written to dummyUsers.csv");

	await postCsvWriter.writeRecords(dummyPosts);
	console.log("Dummy posts data written to dummyPosts.csv");

	await editorialCsvWriter.writeRecords(dummyEditorials);
	console.log("Dummy editorials data written to dummyEditorials.csv");
})();