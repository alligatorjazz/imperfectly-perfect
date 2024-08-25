import { Emoji } from "emoji-type";
import { cache, use } from "react";
import { createClient, User } from '@supabase/supabase-js';
import { Editorial, UserPost, UserProfile } from "../types";
import dayjs, { Dayjs } from "dayjs";
import { v4 } from "uuid";

const supabase = createClient('https://gujhjoklpwgyemsvomlj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1amhqb2tscHdneWVtc3ZvbWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNjg5NDEsImV4cCI6MjAzOTk0NDk0MX0.7_e-BQXRLkDjP8fbpnP6TVyPlSsi6ItAX0WTJUyHdxQ');

export async function signUp(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error && !data) {
		throw new Error(`${error}`);
	}


	if (!data.user) {
		throw new Error("Signup did not return valid user:\n" + JSON.stringify(data, null, 4));
	}

	return login(email, password);
}

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


export async function followAccount(id: string) {
	const profile = await getLoginProfile();
	if (!profile) {
		return logout();
	}

	const updatedFollows = profile.following.concat(id);
	// save updated follows
	const { error } = await supabase
		.from("user-profiles")
		.update({ following: updatedFollows });

	if (error) {
		console.error(error);
	}
}

export async function postAndRefresh(postData: UserPost, customCallback?: () => void) {
	await createPost(postData);
	const remote = await getPost(postData.id);
	if (remote?.id == postData.id) {
		customCallback ? customCallback() : window.location.reload();
	}

}
export const getPost = cache(async (id: string) => {
	await restoreSession();
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", id)
		.single();

	if (error && error.code !== "PGRST116") {
		console.error(error);
	}

	return data as UserPost | null;
});

export type GetPostsParams = {
	before?: string | Date,
	after?: string | Date,
	limit?: number,
	original?: boolean
}

export const getPosts = cache(async (params?: GetPostsParams) => {
	await restoreSession();
	const { data, error } = await supabase
		.from("posts")
		.select(`*`)
		.order("created_at", { ascending: false })
		.lt("created_at", params?.before ?? dayjs().toISOString())
		.gt("created_at", params?.after ?? dayjs().subtract(999, "year").toISOString())
		.limit(params?.limit ?? 100);

	if (error) {
		console.error(error);
	}


	const result = data
		?.filter((post: UserPost) => {
			if (params?.original) {
				return !post.repost;
			} else {
				return true;
			}
		}) as UserPost[] | null;
	
	return result;
});

export const getPostsBy = cache(async (id: string, params: GetPostsParams) => {
	await restoreSession();

	const { data, error } = await supabase
		.from("posts")
		.select(`*`)
		.lt("created_at", params?.before ?? dayjs().toISOString())
		.gt("created_at", params?.after ?? dayjs().subtract(999, "year").toISOString())
		.eq("author", id)
		.limit(params?.limit ?? 100);

	if (error) {
		console.error(error);
	}

	return data?.sort(
		(a: UserPost, b: UserPost) => dayjs(a.created_at).isBefore(b.created_at) ? 1 : -1
	) as UserPost[] | null;
});

export const createPost = cache(async (post: UserPost) => {
	await restoreSession();

	const { error } = await supabase
		.from("posts")
		.insert(post);

	if (error) {
		console.error(error);
	}
});

export const deletePost = cache(async (id: string) => {
	await restoreSession();
	const { error } = await supabase
		.from("posts")
		.delete()
		.eq("id", id);

	if (error && error.code != "PGRST116") {
		console.error(error);
	}
});

export const getProfile = cache(async (id: string) => {
	const session = await restoreSession();

	const { data, error } = await supabase
		.from("user-profiles")
		.select("*")
		.eq("id", id)
		.limit(1)
		.single();

	if (error && error.code != "PGRST116") {
		console.error(error.code, data);
	}

	if (!data) {
		if (id === session?.user.id) {
			return await getLoginProfile();
		} else {
			return null;
		}
	}
	return data as UserProfile;

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

export const createProfile = cache(async (data: UserProfile) => {
	await restoreSession();
	const { error } = await supabase
		.from("user-profiles")
		.insert(data);

	if (error) {
		console.error(error);
	}

	return data as UserProfile;
});

export const updateProfile = cache(async (data: Partial<UserProfile>) => {
	const session = await restoreSession();

	if (!session) {
		throw new Error("Session is not valid - can't update profile.");
	}

	const { error } = await supabase
		.from("user-profiles")
		.update(data)
		.eq("id", session.user.id);

	if (error) {
		console.error(error);
	}
});


export async function getLoginProfile() {
	const session = await restoreSession();
	if (!session) { return null; }
	const { user } = session;
	const { data: profile, error } = await supabase
		.from("user-profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	if (!profile) {
		const username = (user.email ? user.email.split("@")[0] : "newuser") + (Math.floor(Math.random() * 1000)).toString();
		return createProfile({
			id: user.id,
			username,
			display_name: username,
			following: [],
			blocked: [],
			created_at: new Date().toISOString()
		});
	}

	return profile;
}

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

export async function uploadFile(fileData: string | ArrayBuffer, contentType?: string) {
	await restoreSession();
	const { data, error } = await supabase
		.storage
		.from("anon")
		.upload(`upload/${v4()}.png`, fileData, {
			cacheControl: '3600',
			upsert: false,
			contentType
		});

	if (error) {
		console.error(error);
	}

	return data;
}

export async function getPublicUrl(fullPath: string) {
	await restoreSession();
	const { data } = supabase.storage
		.from("anon")
		.getPublicUrl(fullPath);

	return data.publicUrl;
}


