"use client";
import dayjs from "dayjs";
import { HTMLAttributes } from "react";
import { Header } from "./Header";
import { PostList } from "./PostList";
import { useLoginProfile } from "../hooks/useLoginProfile";
import { getPosts } from "../lib/api";
import { useUserPosts } from "../hooks/useUserPosts";
import { UserProfile } from "../types";
import { useProfile } from "../hooks/useProfile";
import { ProfilePanel } from "./ProfilePanel";
import { useLoginId } from "../hooks/useLoginId";

export function LoginProfilePanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const loginId = useLoginId();
	return (
		<>
			{loginId && <ProfilePanel profileId={loginId} />}
		</>
	);
}