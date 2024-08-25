import { Metadata } from "next";
import { AllFeed } from "../../../components/AllFeed";

export const metadata: Metadata = {
	title: 'PI.FYI | Everyone',
	description: "A Taste of YOUR Taste"
};

export default function Everyone() {
	return (
		<AllFeed />
	);
}