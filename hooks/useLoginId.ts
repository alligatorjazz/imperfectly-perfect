"use client";
import { useEffect, useState } from "react";
import { restoreSession } from "../lib/api";
import { useRouter } from "next/navigation";

export function useLoginId() {
	const [loginId, setLoginId] = useState<string>();
	const router = useRouter();
	useEffect(() => {
		if (!loginId) {
			restoreSession()
				.then(session => {
					if (session?.user?.id) {
						setLoginId(session.user.id);
					} else {
						router.push("/");
					}
				});
		}
	}, [loginId, router]);

	return loginId;
}