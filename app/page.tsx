import { Metadata } from "next";
import { Button } from "../components/Button";

export const metadata: Metadata = {
	title: 'PI.FYI | Home',
	description: "A Taste of YOUR Taste"
};

export default function Index() {
	return (
		<a href="/home"><Button>Go Home</Button></a>
	);
}