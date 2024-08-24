"use client";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { useLoginProfile } from "../hooks/useLoginProfile";
import { getPosts } from "../lib/api";
import { useUserPosts } from "../hooks/useUserPosts";

export function ProfilePanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const profile = useLoginProfile();
	const posts = useUserPosts(profile);

	return (
		<div >
			<Header level={1} className="text-8xl w-full text-center mb-4">{"@" + (profile?.username ?? "notfound")}</Header>
			<div className="border-b border-dashed py-4 border-textColor mb-8">
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Joined</p>
					<p>{dayjs(profile?.created_at ?? new Date()).format("MMM DD, YYYY")}</p>
				</div>
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Following</p>
					<p className="underline decoration-dashed decoration-slate-400">{profile?.following.length ?? 0} People</p>
				</div>
			</div>
			{profile && posts && posts.length > 0 ? <PostList posts={posts} /> : <h1 className="text-xl uppercase text-center">No Posts Yet.</h1>}
		</div>
	);
}