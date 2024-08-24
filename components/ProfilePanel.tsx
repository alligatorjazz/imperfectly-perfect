"use client";
import dayjs from "dayjs";
import { HTMLAttributes, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import { useUserPosts } from "../hooks/useUserPosts";
import { Header } from "./Header";
import { PostList } from "./PostList";

export function ProfilePanel({ className, profileId, ...props }: HTMLAttributes<HTMLDivElement> & { profileId?: string }) {
	const profile = useProfile(profileId);
	const posts = useUserPosts(profile);

	useEffect(() => {
		console.log("profile posts:", profile, posts);
	}, [posts, profile]);

	return (
		<div>
			<Header level={1} className="text-2xl md:text-4xl lg:text-6xl w-full text-center mb-4 block whitespace-nowrap text-ellipsis " >{"@" + (profile?.username ?? "notfound")}</Header>
			<div className="border-b border-dashed py-4 border-textColor mb-8">
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Joined</p>
					<p>{dayjs(profile?.created_at ?? new Date()).format("MMM DD, YYYY")}</p>
				</div>
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Following</p>
					<p className="underline decoration-dashed decoration-slate-400">
						{profile?.following?.length ?? 0}
						{' '}
						People
					</p>
				</div>
			</div>
			{posts && Array.isArray(posts) && posts?.length > 0 ? <PostList posts={posts} /> : <h1 className="text-xl uppercase text-center">No Posts Yet.</h1>}
		</div>
	);
}