"use client";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { getPosts } from '../lib/api';
import { useEffect, useState } from "react";
import { UserPost } from "../types";


export function WhatsHot() {
	const [initialPosts, setInitialPosts] = useState<UserPost[]>();
	useEffect(() => {
		getPosts({ limit: 25, original: true })
			.then(posts => posts ? setInitialPosts(posts) : setInitialPosts([]))
			.catch(err => console.error(err));
	}, []);
	return (
		<div>
			<Header level={1} className="text-5xl w-full text-center py-8">{"What's hot!"}</Header>
			{initialPosts && <PostList posts={initialPosts} next={{ original: true, limit: 10 }} />}
		</div>
	);
}