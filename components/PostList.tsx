"use client";
import { FiBookmark, FiLink, FiMoreHorizontal } from "react-icons/fi";
import { UserPost, UserProfile } from "../types";
import Image from "next/image";
import { CommentsIcon } from "./CommentsIcon";
import { faker } from "@faker-js/faker";
import { IconButton } from "./IconButton";
import { getPost, getProfile } from "../lib/api";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getProfileLink } from "../lib/utils";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

interface Props {
	posts: UserPost[]
}

export function PostList({ posts }: Props) {
	const [authors, setAuthors] = useState<{ [id: string]: UserProfile }>({});
	const [reposters, setReposters] = useState<{ [id: string]: UserProfile }>({});
	const [originals, setOriginals] = useState<{ [id: string]: UserPost }>({});

	useEffect(() => {
		for (const post of posts) {
			// set authors
			getProfile(post.author)
				.then(profile => {
					if (profile) { setAuthors(prev => ({ ...prev, [post.id]: profile })); }
					else {
						console.warn("Couldn't get author profile for post ", post.id);
					}
				}).catch(err => console.error(err));

			if (post.repost) {
				// get original post
				getPost(post.repost)
					.then(original => {
						if (original && post.repost) {
							setOriginals(prev => ({ ...prev, [post.repost as string]: original }));
							// get original author
							getProfile(original.author)
								.then(author => {
									if (author) { setAuthors(prev => ({ ...prev, [post.id]: author })); }
									else {
										console.warn("Couldn't get original author profile for post ", post.id);
									}
								})
								.catch(err => console.error(err));

						} else {
							console.warn("Couldn't get original post for ", post.id);
						}
					})
					.catch(err => console.error(err));
				// get reposter profile
				getProfile(post.author)
					.then(profile => {
						if (profile) { setReposters(prev => ({ ...prev, [post.id]: profile })); }
						else {
							console.warn("Couldn't get reposter profile for post ", post.id);
						}
					})
					.catch(err => console.error(err));
			}
		}
	}, [posts]);

	return (
		<div className="flex flex-col gap-4">
			{posts.map(data => {
				const replies = 2;
				const post = data.repost ? originals[data.id] : data;
				if (!post) {
					return null;
				}

				const author = authors[post.id];
				const reposter = data.repost ? reposters[data.id] : null;

				return (
					<div className="flex flex-col border border-dashed border-textColor" key={post.id}>
						{/* post content */}
						<div className="flex flex-col p-4">
							{/* top row */}
							<div className="flex justify-between items-center gap-2 mb-4">
								<div className="text-3xl">{post.emoji ?? "⭐️"}</div>
								<div className="flex flex-1 gap-4">
									{post.link && <a href={post.link}><FiLink size={24} color="blue" /></a>}
									{reposter && <a href={getProfileLink(reposter.id)} className="flex flex-1 gap-1 text-xs opacity-40">
										<Image
											src={reposter.avatar ?? "/img/dummy-avatar.avif"}
											width={16}
											height={16}
											alt={`${reposter.display_name}'s avatar.`}
											className="w-4 h-4"
										/>
										<p className="font-bold italic uppercase">{"Re-Rec'd by @" + reposter.username}</p>
									</a>}
								</div>
								<FiMoreHorizontal size={24} />
							</div>
							{/* headline */}
							<h1 className="text-3xl mb-4 font-bold uppercase">{post.headline}</h1>
							{/* body */}
							{post.body && <p className="font-content text-xl mb-4 leading-6">{post.body}</p>}
							{/* author & timestamp */}
							{post.image && <div className="p-4 max-h-[33vh] w-fill overflow-hidden mb-8">
								<Image
									src={post.image}
									width={160 * 3}
									height={90 * 3}
									alt={post.headline}
									className="object-contain"
								/>
							</div>}
							<a className="flex justify-between items-center gap-2" href={author ? getProfileLink(author.id) : "/404"}>
								<Image
									src={author?.avatar ?? "/img/dummy-avatar.avif"}
									alt={`${author?.username}'s avatar.`}
									width={18}
									height={18}
								/>
								<p className="uppercase font-bold flex-1 text-sm">{`@${author?.username}`}</p>
								<p className="font-bold opacity-30 text-sm">
									{
										dayjs(post.created_at).isBefore(dayjs().subtract(1, "day")) ?
											dayjs(post.created_at).format("MMM DD, YYYY") :
											dayjs(post.created_at).fromNow()
									}
								</p>
							</a>

						</div>
						{/* post actions */}
						<div className="flex justify-between items-center border-t border-dashed border-textColor p-4 gap-4">
							<IconButton tooltip="Remember this rec for later...">
								<FiBookmark size={24} />
							</IconButton>
							<div className="flex-1"></div>
							<IconButton className="flex gap-1 font-bold text-xl" tooltip={replies ? replies + " replies" : undefined}>
								{replies && <p>{replies}</p>}
								<CommentsIcon />
							</IconButton>
							<Image
								src={"/img/three-endorsed.avif"}
								width={24}
								height={24}
								alt="Like"
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}