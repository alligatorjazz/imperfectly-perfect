"use client";
import router from "next/router";
import { useState, useEffect } from "react";
import { getLoginProfile, getPosts } from "../lib/api";
import { UserPost, UserProfile } from "../types";

export function useUserPosts(profile: UserProfile | undefined) {
	const [posts, setPosts] = useState<UserPost[]>();
	useEffect(() => {
		if (profile && !posts) {
			getPosts()
				.then(result => {
					setPosts(result ?? [])
				}).catch(err => {
					console.error(err);
					router.push("/");
				})
		}
	}, [profile, posts])

	return posts;
}