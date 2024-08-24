"use client";
import { useEffect, useState } from "react";
import { getProfile } from "../lib/api";
import { UserProfile } from "../types";

export function useProfile(id?: string) {
	const [profile, setProfile] = useState<UserProfile>();
	useEffect(() => {
		if (!profile && id) {
			getProfile(id)
				.then(result => {
					if (result)
						setProfile(result);
				}).catch(err => {
					console.error(err);
				});
		}
	}, [profile, id]);

	return profile;
}