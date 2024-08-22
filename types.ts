import { Emoji } from "emoji-type"

export type NavLinks = { href: string, title: string }[]
export type UserPost = {
	headline: string,
	body?: string,
	image?: string
	link?: string
	emoji?: Emoji
	timestamp: string,
	authorId: string
}