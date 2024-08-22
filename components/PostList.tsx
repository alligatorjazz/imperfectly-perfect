import { FiBookmark, FiMoreHorizontal } from "react-icons/fi";
import { UserPost } from "../types";
import Image from "next/image";
import { CommentsIcon } from "./CommentsIcon";
import { faker } from "@faker-js/faker";
import { IconButton } from "./IconButton";

interface Props {
	posts: UserPost[]
}

export function PostList({ posts }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{posts.map(post => {
				const replies = Math.random() > 0.3 ? undefined : faker.number.int({ min: 1, max: 15 })
				return (
					<div className="flex flex-col border border-dashed border-textColor" key={post.timestamp + post.headline}>
						{/* post content */}
						<div className="flex flex-col p-4">
							{/* top row */}
							<div className="flex justify-between mb-4">
								<div className="text-3xl">{post.emoji ?? "⭐️"}</div>
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
									src={"/img/dummy-avatar.avif"}
									alt={"dummy avatar"}
									width={18}
									height={18}
								/>
								<p className="uppercase font-bold flex-1 text-sm">@unimplemented</p>
								<p className="font-bold opacity-40">10m ago</p>
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