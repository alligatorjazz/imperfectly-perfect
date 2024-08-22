import { FiBookmark, FiMoreHorizontal } from "react-icons/fi";
import { UserPost } from "../types";
import Image from "next/image";
import { CommentsIcon } from "./CommentsIcon";
import { faker } from "@faker-js/faker";

interface Props {
	posts: UserPost[]
}

export function PostList({ posts }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{posts.map(post => {
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
							<div className="flex-1">
								<FiBookmark size={24} />
							</div>
							<div className="flex gap-1 font-bold text-xl">
								{Math.random() > 0.3 ? "" : <p>{faker.number.int({ min: 1, max: 25 })}</p>}
								<CommentsIcon />
							</div>
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