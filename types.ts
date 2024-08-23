import { Emoji } from "emoji-type";

export type NavLinks = { href: string, title: string }[]
export type UserPost = {
	id: string,
	headline: string,
	body?: string,
	image?: string
	link?: string
	emoji?: Emoji
	created_at: string,
	author: string,
	repost?: string
} 

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
	id: string,
	guest: string,
	created_at: string,
	cover: string,
	account: string
}

export type ProfileTheme = {
	background?: string,
	text?: string,
	primary?: string,
	secondary?: string,
	tertiary?: string
}

export type UserProfile = {
	id: string,
	username: string,
	display_name: string,
	following: string[],
	blocked: string[],
	created_at: string,
	avatar?: string
}