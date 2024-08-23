import { Emoji } from "emoji-type";
import { cache } from "react";
import { createClient } from '@supabase/supabase-js';
import { UserPost, UserProfile } from "../types";
import dayjs from "dayjs";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://gujhjoklpwgyemsvomlj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1amhqb2tscHdneWVtc3ZvbWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjg5NDEsImV4cCI6MjAzOTk0NDk0MX0.7_e-BQXRLkDjP8fbpnP6TVyPlSsi6ItAX0WTJUyHdxQ');

export const getPost = cache(async (id: string) => {
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
	limit?: number
}) => {
	const { data, error } = await supabase
		.from("posts")
		.select(`*`)
		.limit(100);

	if (error) {
		console.error(error);
	}
	
	return data?.sort((a: UserPost, b: UserPost) => dayjs(a.created_at).isBefore(b.created_at) ? 1 : -1) as UserPost[] | null;
});


export const getProfile = cache(async (id: string) => {
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
