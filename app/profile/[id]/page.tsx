import { ProfilePanel } from "../../../components/ProfilePanel";
import { restoreSession } from "../../../lib/api";

export default async function Profile({ params: { id } }: { params: { id: string } }) {
	const decodedId = decodeURIComponent(id);
	return (
		<ProfilePanel profileId={decodedId} />
	);
}