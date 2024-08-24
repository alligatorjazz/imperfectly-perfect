"use client";
import { useEffect, useState } from "react";
import { getPostsBy } from "../lib/api";
import { UserPost, UserProfile } from "../types";

export function useUserPosts(profile: UserProfile | undefined) {
	const [posts, setPosts] = useState<UserPost[] | "loading" | null>();
	useEffect(() => {
		if (profile && !posts) {
			setPosts("loading");
			getPostsBy(profile.id)
				.then(result => {
					if (result)
						setPosts(result);
					else 
						console.warn(`Couldn't get posts for user @${profile.username}.`);
				}).catch(err => {
					console.error(err);
				});
		}
	}, [posts, profile]);

	return posts;
}