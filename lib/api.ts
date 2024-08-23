import { Emoji } from "emoji-type";
import { cache } from "react";
import { createClient, User } from '@supabase/supabase-js';
import { Editorial, UserPost, UserProfile } from "../types";
import dayjs from "dayjs";

const supabase = createClient('https://gujhjoklpwgyemsvomlj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1amhqb2tscHdneWVtc3ZvbWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjg5NDEsImV4cCI6MjAzOTk0NDk0MX0.7_e-BQXRLkDjP8fbpnP6TVyPlSsi6ItAX0WTJUyHdxQ');

export async function login(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) {
		console.error(error);
	}

	return data;
}

export async function logout() {
	const { error: signOutError } = await supabase.auth.signOut();
	if (signOutError) {
		console.error("signOutError: ", signOutError);
	}
}

export async function restoreSession() {
	const { data, error: sessionError } = await supabase.auth.getSession();
	if (sessionError) {
		console.error("sessionError: ", sessionError);
		logout();
	}

	return data.session;
}



export const getPost = cache(async (id: string) => {
	await restoreSession();
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
	}

	return data as UserPost | null;
});

export const getPosts = cache(async (params?: {
	before?: Date,
	after?: Date,
	by?: string,
	about?: Emoji,
	with?: "link" | "image",
	contains?: string[],
	limit?: number,
	original?: boolean
}) => {
	await restoreSession();
	const { data, error } = await supabase
		.from("posts")
		.select(`*`)
		.limit(100);

	if (error) {
		console.error(error);
	}

	return data?.sort((a: UserPost, b: UserPost) => dayjs(a.created_at).isBefore(b.created_at) ? 1 : -1)?.filter((post: UserPost) => !post.repost || !params?.original) as UserPost[] | null;
});


export const getProfile = cache(async (id: string) => {
	await restoreSession();
	const { data, error } = await supabase
		.from("user-profiles")
		.select("*")
		.eq("id", id)
		.single();

	if (error && error.code != "PGRST116") {
		console.error(error, data);
	}

	return data as UserProfile | null;
});

export const getProfiles = cache(async () => {
	await restoreSession();
	const { data, error } = await supabase
		.from("user-profiles")
		.select("*")
		.limit(50);

	if (error && error.code != "PGRST116") {
		console.error(error, data);
	}

	return data as UserProfile[] | null;
});


export const getEditorials = cache(async () => {
	await restoreSession();
	const { data, error } = await supabase
		.from("editorials")
		.select("*")
		.limit(50);

	if (error && error.code != "PGRST116") {
		console.error(error, data);
	}

	return data as Editorial[] | null;
});
