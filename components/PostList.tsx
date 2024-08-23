import { FiBookmark, FiMoreHorizontal } from "react-icons/fi";
import { UserPost } from "../types";
import Image from "next/image";
import { CommentsIcon } from "./CommentsIcon";
import { faker } from "@faker-js/faker";
import { IconButton } from "./IconButton";
import { getPost, getProfile } from "../lib/api";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
	posts: UserPost[]
}

export function PostList({ posts }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{posts.map(async data => {
				const replies = Math.random() > 0.3 ? undefined : faker.number.int({ min: 1, max: 15 });
				const post = data.repost ? await getPost(data.repost) : data;
				if (!post) {
					console.error(`Couldn't load data for post:\n${data}.`);
					return null;
				}
				const author = await getProfile(post.author);
				const reposter = data.repost ? await getProfile(data.author) : null;

				if (!author) {
					console.error(`Author not found for post: `, data);
					console.log(await getProfile(data.author));
				}

				return (
					<div className="flex flex-col border border-dashed border-textColor" key={post.created_at + post.headline}>
						{/* post content */}
						<div className="flex flex-col p-4">
							{/* top row */}
							<div className="flex justify-between items-center gap-2 mb-4">
								<div className="text-3xl">{post.emoji ?? "⭐️"}</div>
								{/* TODO: reposter details */}
								{reposter && <div className="flex flex-1 gap-1 text-xs opacity-40">
									<Image
										src={reposter.avatar ?? "/img/dummy-avatar.avif"}
										width={16}
										height={16}
										alt={`${reposter.display_name}'s avatar.`}
										className="w-4 h-4"
									/>
									<p className="font-bold italic uppercase">{"Re-Rec'd by @" + reposter.username}</p>
								</div>}
								<FiMoreHorizontal size={24} />
							</div>
							{/* headline */}
							<h1 className="text-3xl mb-4 font-bold uppercase">{post.headline}</h1>
							{/* body */}
							{post.body && <p className="font-content text-xl mb-4 leading-6">{post.body}</p>}
							{/* author & timestamp */}
							{/* TODO: implement user fetching */}
							<div className="flex justify-between items-center gap-2">
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
							</div>

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