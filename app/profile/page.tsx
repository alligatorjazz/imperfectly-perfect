import dayjs from "dayjs";
import { Header } from "../../components/Header";
import { PostList } from "../../components/PostList";
import { SearchBar } from "../../components/SearchBar";
import { UnrolledSelect } from "../../components/UnrolledSelect";
import { UserCard } from "../../components/UserCard";
import { dummyPosts, dummyUsers } from "../../dummy";

// TODO: add emoji based on post tags

export default function Profile() {
	return (
		<div>
			<Header level={1} className="text-8xl w-full text-center mb-4">{"@Dummy"}</Header>
			<div className="border-b border-dashed py-4 border-textColor mb-8">
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Joined</p>
					<p>{dayjs().format("MMM DD, YYYY")}</p>
				</div>
				<div className="flex justify-between uppercase text-sm font-bold">
					<p>Following</p>
					<p className="underline decoration-dashed decoration-slate-400">0 People</p>
				</div>
			</div>
			<PostList posts={dummyPosts.slice(0, 5)}/>
		</div>
	);
}