"use client";
import { FiBookmark, FiLink, FiMoreHorizontal } from "react-icons/fi";
import { UserPost, UserProfile } from "../types";
import Image from "next/image";
import { CommentsIcon } from "./CommentsIcon";
import { faker } from "@faker-js/faker";
import { IconButton } from "./IconButton";
import { getPost, getProfile } from "../lib/api";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getProfileLink } from "../lib/utils";
import { useEffect, useState } from "react";
import { TooltipContainer } from "./TooltipContainer";
import { PostCard } from "./PostCard";

dayjs.extend(relativeTime);

interface Props {
	posts: UserPost[]
}

export function PostList({ posts }: Props) {
	return (
		<div className="flex flex-col gap-4">
			{posts.map(post => <PostCard key={post.id} post={post}/>)}
		</div>
	);
}