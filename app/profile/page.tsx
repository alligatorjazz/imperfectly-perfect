import dayjs from "dayjs";
import { Header } from "../../components/Header";
import { getLoginProfile, getPosts } from "../../lib/api";
import { PostList } from "../../components/PostList";
import { ProfilePanel } from "../../components/ProfilePanel";

// TODO: add emoji based on post tags

export default async function Profile() {
	return (
		<ProfilePanel />
	);
}