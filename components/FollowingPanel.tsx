"use client";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getLoginProfile, getPosts, login, updateProfile } from "../lib/api";
import { UserPost, UserProfile } from "../types";
import { useLoginProfile } from "../hooks/useLoginProfile";
import { PostList } from "./PostList";

type Inputs = {
	username: string
	displayName: string
}

export function FollowingPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const profile = useLoginProfile();
	const [posts, setPosts] = useState<UserPost[]>();
	useEffect(() => {
		if (profile) {
			const { following } = profile;
			const followedPosts = [];
			Promise.all(following.map(async (id) => {
				return await getPosts({ by: id });
			})).then(result => setPosts((result.filter(result => result) as UserPost[][]).flat(1)));
		}
	}, [profile]);

	return (
		<div>
			{posts && posts.length > 0 ?
				<PostList posts={posts} /> :
				profile && profile.following.length > 0 ?
					<h1 className="text-xl uppercase text-center">No posts from your follows yet.</h1> :
					<h1 className="text-xl uppercase text-center">{"You don't follow anyone yet."}</h1>
			}
		</div>
	);
}