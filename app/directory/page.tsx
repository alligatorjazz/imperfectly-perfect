import { Header } from "../../components/Header";
import { PostList } from "../../components/PostList";
import { SearchBar } from "../../components/SearchBar";
import { UnrolledSelect } from "../../components/UnrolledSelect";
import { UserCard } from "../../components/UserCard";
import { dummyPosts, dummyUsers } from "../../dummy";

export default function Directory() {
	return (
		<div>
			<Header level={1} className="text-6xl w-full text-center py-8">{"Directory"}</Header>
			<SearchBar className="mb-8" />
			<div className="w-full flex flex-wrap justify-center max-w-2xl gap-4">
				{dummyUsers.map(user => <UserCard key={user.id} user={user} />)}
			</div>
		</div>
	);
}