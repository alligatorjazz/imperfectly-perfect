"use client";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPosts, getPostsBy, GetPostsParams } from "../lib/api";
import { UserPost } from "../types";
import { PostCard } from "./PostCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { uniq, uniqBy } from "lodash";
import { isInViewport } from "../lib/utils";

dayjs.extend(relativeTime);

interface Props {
	posts: UserPost[],
	next?: { id: string, params: Omit<GetPostsParams, "before"> } | Omit<GetPostsParams, "before">;
}

export function PostList({ posts: initialPosts, next }: Props) {
	const [posts, setPosts] = useState<UserPost[]>(initialPosts);
	const [lock, setLock] = useState(false);
	const [lastPostVisible, setLastPostVisible] = useState(false);

	const lastTimestamp = useMemo(() => {
		const lastPost = posts[posts.length - 1];
		// console.log("timestamp: ", lastPost);
		return lastPost.created_at;
	}, [posts]);

	const updateLastPostVisible = useCallback(() => {
		const last = document.getElementById("last-post");
		if (!last) { return setLastPostVisible(false); }
		return setLastPostVisible(isInViewport(last));
	}, []);

	useEffect(() => {
		if (next && !lock && lastPostVisible) {
			setLock(true);
			if ("id" in next) {
				console.warn("unimplemented");
			} else {
				getPosts({ ...next, before: lastTimestamp })
					.then(newPosts => setPosts(
						prev => newPosts ? uniqBy(prev.concat(...newPosts), "id") : prev
					))
					.finally(() => setTimeout(() => setLock(false), 500));
			}
		}
	}, [lastPostVisible, lastTimestamp, lock, next]);

	useEffect(() => {
		window.addEventListener("scroll", updateLastPostVisible);
	}, [updateLastPostVisible]);

	return (
		<div className="flex flex-col gap-4">
			{posts.map((post, index) => <PostCard key={post.id} post={post} id={index === posts.length - 1 ? "last-post" : ""} />)}
		</div>
	);
}