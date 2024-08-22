import { Metadata } from "next";
import { NavLinks } from "../types";
import Link from "next/link";
import { Button } from "../components/Button";

export const metadata: Metadata = {
	title: 'PI.FYI | Home',
	description: "A Taste of YOUR Taste"
};

export default function Index() {
	return (
		<div>
			<a href="/home"><Button>Go Home</Button></a>
		</div>
	);
}