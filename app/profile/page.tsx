import dayjs from "dayjs";
import { Header } from "../../components/Header";
import { getLoginProfile, getPosts } from "../../lib/api";
import { PostList } from "../../components/PostList";

// TODO: add emoji based on post tags

export default async function Profile() {
	const profile = await getLoginProfile();
	const posts = await getPosts({ by: profile?.id });
	return (
		<div>
			<Header level={1} className="text-8xl w-full text-center mb-4">{"@" + (profile?.username ?? "notfound")}</Header>
			<div className="border-b border-dashed py-4 border-textColor mb-8">
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Joined</p>
					<p>{dayjs(profile?.created_at ?? new Date()).format("MMM DD, YYYY")}</p>
				</div>
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Following</p>
					<p className="underline decoration-dashed decoration-slate-400">{profile?.following.length ?? 0} People</p>
				</div>
			</div>
			{profile && posts && <PostList posts={posts} />}
		</div>
	);
}