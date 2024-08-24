"use client";
import { useEffect, useState } from "react";
import { restoreSession } from "../lib/api";

export function useLoginId() {
	const [loginId, setLoginId] = useState<string>();
	useEffect(() => {
		if (!loginId) {
			restoreSession()
				.then(session => {
					if (session) {
						setLoginId(session.user.id);
					}
				})
		}
	}, [loginId])

	return loginId;
}