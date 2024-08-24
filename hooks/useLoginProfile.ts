"use client";
import { useRouter } from "next/navigation";
import { useLoginId } from "./useLoginId";
import { useProfile } from "./useProfile";

export function useLoginProfile() {
	const router = useRouter();
	const loginId = useLoginId();
	const profile = useProfile(loginId);

	return profile;
}