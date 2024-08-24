import { Metadata } from "next";
import { FollowingPanel } from "../../../components/FollowingPanel";

export const metadata: Metadata = {
	title: 'PI.FYI | Friends',
	description: "A Taste of YOUR Taste"
};

export default function Following() {
	return (
		<FollowingPanel />
	);
}