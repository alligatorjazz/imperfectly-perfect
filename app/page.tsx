import { Metadata } from "next";
import { NavLinks } from "../types";
import Link from "next/link";
import { Button } from "../components/Button";

export const metadata: Metadata = {
	title: 'Home',
	description: 'Welcome to Next.js',
};

const localNav: NavLinks = [
	{ href: "./top", title: "Home" },
	{ href: "./following", title: "Friends" },
	{ href: "./everyone", title: "Home" }
];
export default function Index() {
	return (
		<div>
			<a href="/home"><Button>Go Home</Button></a>
		</div>
	);
}