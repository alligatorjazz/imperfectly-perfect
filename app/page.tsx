import { Metadata } from "next";
import { Button } from "../components/Button";
import { LoginPanel } from "../components/LoginPanel";
import { useEffect } from "react";

export const metadata: Metadata = {
	title: 'PI.FYI | Home',
	description: "A Taste of YOUR Taste"
};

export default function Index() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<LoginPanel className="mb-16" />
		</div>
	);
}