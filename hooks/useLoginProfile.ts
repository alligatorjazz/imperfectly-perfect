"use client";
import router from "next/router";
import { useState, useEffect } from "react";
import { getLoginProfile } from "../lib/api";
import { UserProfile } from "../types";

export function useLoginProfile() {
	const [profile, setProfile] = useState<UserProfile>();
	useEffect(() => {
		if (!profile) {
			getLoginProfile()
				.then(result => {
					result ? setProfile(result) : router.push("/")
				}).catch(err => {
					console.error(err);
					router.push("/");
				})
		}
	}, [profile])

	return profile;
}