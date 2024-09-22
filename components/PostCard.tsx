"use client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLink, FiMoreHorizontal } from "react-icons/fi";
import { v4 } from "uuid";
import { useLoginId } from "../hooks/useLoginId";
import { deletePost, getPost, getProfile, postAndRefresh } from "../lib/api";
import { getProfileLink } from "../lib/utils";
import { UserPost, UserProfile } from "../types";
import { TooltipContainer } from "./TooltipContainer";

interface Props {
	post: UserPost
	id?: string
}
export function PostCard({ post: data, id }: Props) {
	const loginId = useLoginId();
	const [author, setAuthor] = useState<UserProfile>();
	const [reposter, setReposter] = useState<UserProfile>();
	const [original, setOriginal] = useState<UserPost>();
	const [showMenu, setShowMenu] = useState(false);



	const post = data.repost ? original : data;

	useEffect(() => {
		if (!author && !reposter && !original) {
			if (data.repost) {
				// get original post
				getPost(data.repost)
					.then(original => {
						if (original && data.repost) {
							setOriginal(original);
							// get original author
							getProfile(original.author)
								.then(author => {
									if (author) { setAuthor(author); }
									else {
										console.warn("Couldn't get original author profile for post ", data.id);
									}
								})
								.catch(err => console.error(err));

						} else {
							console.warn("Couldn't get original post for ", data.id);
						}
					})
					.catch(err => console.error(err));
				// get reposter profile
				getProfile(data.author)
					.then(profile => {
						if (profile) { setReposter(profile); }
						else {
							console.warn("Couldn't get reposter profile for post ", data.id);
						}
					})
					.catch(err => console.error(err));
			} else {
				// set author
				getProfile(data.author)
					.then(profile => {
						if (profile) { setAuthor(profile); }
						else {
							console.warn("Couldn't get author profile for post ", data.id);
						}
					}).catch(err => console.error(err));

			}
		}
	}, [author, data.author, data.id, data.repost, original, post, reposter]);

	return (
		<>
			{post && <div id={id} className="flex flex-col border border-dashed border-textColor" key={post.id}>
				{/* post content */}
				<div className="flex flex-col p-4">
					{/* top row */}
					<div className="flex justify-between items-center gap-2 mb-4">
						<div className="text-3xl select-none">{post.emoji ?? "⭐️"}</div>
						<div className="flex flex-1 gap-4 items-center">
							{post.link && <a target="_blank" href={post.link}><FiLink size={24} color="blue" /></a>}
							{reposter && <Link href={getProfileLink(reposter.id)} className="flex flex-1 gap-1 text-xs opacity-40">
								<Image
									src={reposter.avatar ?? "/img/dummy-avatar.avif"}
									width={16}
									height={16}
									alt={`${reposter.display_name}'s avatar.`}
									className="w-4 h-4"
								/>
								<p className="font-bold italic uppercase">{"Re-Rec'd by @" + reposter.username}</p>
							</Link>}
						</div>
						<TooltipContainer
							tooltip={<ul className="flex flex-col font-primary font-bold">
								{loginId && post.author !== loginId && <li className="h-8 w-32 flex justify-center">
									<button onClick={() => {
										postAndRefresh({
											id: v4(),
											repost: post.id,
											created_at: new Date().toISOString(),
											author: loginId,
											headline: ""
										}, () => alert("Re-rec'd!"));

									}}
										className="uppercase">
										Re-Rec
									</button>
								</li>}
								{/* <li className="h-8 w-32 flex justify-center">
									<button
										onClick={() => {
											navigator.clipboard.writeText(`https://${window.location.hostname}/posts/${post.id}`);
											alert("Copied link!");
										}}
										className="uppercase"
									>
										Copy Link
									</button>
								</li> */}
								{(data.author === loginId) && <li className="h-8 w-32 flex justify-center">
									<button onClick={() => deletePost(data.id)
										.then(result => result === true ? window.location.reload() : console.error(result))
									} className="uppercase">
										Delete
									</button>
								</li>}
							</ul>}
							show={showMenu}
							onBlur={() => setShowMenu(false)}
							onClick={(e) => { (e.target as HTMLElement).focus(); setShowMenu(prev => !prev); }}
							className="cursor-pointer"
						>
							<FiMoreHorizontal size={24} />
						</TooltipContainer>

					</div>
					{/* headline */}
					<h1 className="text-3xl mb-4 font-bold uppercase">{post.headline}</h1>
					{/* body */}
					{post.body && <p className="font-content text-xl mb-4 leading-6">{post.body}</p>}
					{/* author & timestamp */}
					{post.image && <div className="p-4 w-fill overflow-hidden mb-8">
						<Image
							src={post.image}
							width={160 * 3}
							height={90 * 3}
							alt={post.headline}
							className="object-contain"
						/>
					</div>}
					<Link className="flex justify-between items-center gap-2" href={author ? getProfileLink(author.id) : "/404"}>
						<Image
							src={author?.avatar ?? "/img/dummy-avatar.avif"}
							alt={`${author?.username}'s avatar.`}
							width={18}
							height={18}
						/>
						<p className="uppercase font-bold text-sm mr-auto">{`@${author?.username}`}</p>
						<p className="font-bold opacity-30 text-sm">
							{
								dayjs(post.created_at).isBefore(dayjs().subtract(1, "day")) ?
									dayjs(post.created_at).format("MMM DD, YYYY") :
									dayjs(post.created_at).fromNow()
							}
						</p>
					</Link>

				</div >
				{/* post actions */}
				< div className="flex justify-between items-center border-t border-dashed border-textColor p-4 gap-4" >
					{/* <IconButton tooltip="Remember this rec for later...">
						<FiBookmark size={24} />
					</IconButton> */}
					< div className="flex-1" ></div >
					{/* <IconButton className="flex gap-1 font-bold text-xl" tooltip={replies ? replies + " replies" : undefined}>
						{replies && <p>{replies}</p>}
						<CommentsIcon />
					</IconButton> */}
					{/* <Image
						src={"/img/three-endorsed.avif"}
						width={24}
						height={24}
						alt="Like"
					/> */}
				</div >
			</div >}
		</>
	);
}