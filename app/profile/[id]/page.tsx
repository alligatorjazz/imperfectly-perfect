import { ProfilePanel } from "../../../components/ProfilePanel";
import { restoreSession } from "../../../lib/api";

// TODO: add emoji based on post tags

export default async function Profile({ params: { id } }: { params: { id: string } }) {
	const decodedId = decodeURIComponent(id);
	return (
		<ProfilePanel profileId={decodedId} />
	);
}