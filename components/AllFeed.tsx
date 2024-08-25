"use client";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { getPosts } from '../lib/api';
import { useEffect, useState } from "react";
import { UserPost } from "../types";
import dayjs from "dayjs";


export function AllFeed() {
	const [initialPosts, setInitialPosts] = useState<UserPost[]>();
	useEffect(() => {
		getPosts({ limit: 25, before: dayjs().add(7, "day").toISOString() })
			.then(posts => posts ? setInitialPosts(posts) : setInitialPosts([]))
			.catch(err => console.error(err));
	}, []);

	return (
		<div>
			{initialPosts && <PostList posts={initialPosts} next={{ original: true, limit: 10 }} />}
		</div>
	);
}