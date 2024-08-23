import { Header } from "../../components/Header";
import { PostList } from "../../components/PostList";
import { SearchBar } from "../../components/SearchBar";
import { UnrolledSelect } from "../../components/UnrolledSelect";
import { UserCard } from "../../components/UserCard";
import { getProfile, getProfiles } from "../../lib/api";

export default async function Directory() {
	const profiles = await getProfiles();
	return (
		<div>
			<Header level={1} className="text-6xl w-full text-center py-8">{"Directory"}</Header>
			<SearchBar className="mb-8" />
			<div className="w-full flex flex-wrap justify-center max-w-2xl gap-4">
				{profiles?.map(profile => <UserCard key={profile.id} user={profile} />)}
			</div>
		</div>
	);
}