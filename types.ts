import { Emoji } from "emoji-type";

export type NavLinks = { href: string, title: string }[]
export type UserPost = {
	id: string,
	headline: string,
	body?: string,
	image?: string
	link?: string
	emoji?: Emoji
	timestamp: string,
	authorId: string,
	reRec: false
} | { reRec: true, id: string, recommender: string }

export const SortCategories = [
	{ emoji: "⭐", title: "Everything" },
	{ emoji: "🎵", title: "Music" },
	{ emoji: "📽️", title: "Movies" },
	{ emoji: "📚", title: "Books" },
	{ emoji: "👕", title: "Clothes" },
	{ emoji: "🍔", title: "Food & Drink" },
	{ emoji: "📺", title: "Tv" },
	{ emoji: "📹", title: "Videos" },
	{ emoji: "🏛️", title: "Places" },
	{ emoji: "🧠", title: "Random" }
];


export type Editorial = {
	guest: string,
	timestamp: string,
	coverUrl: string,
	accountId: string
}

export type ProfileTheme = {
	background?: string,
	text?: string,
	primary?: string,
	secondary?: string,
	tertiary?: string
}

export type UserAccount = {
	id: string,
	username: string,
	displayName: string,
	followingIds: string[],
	blockedIds: string[],
	joinedAt: string,
	theme: ProfileTheme
}