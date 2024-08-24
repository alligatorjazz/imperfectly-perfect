import { Metadata } from "next";
import { SignupPanel } from "../../components/SignupPanel";

export const metadata: Metadata = {
	title: 'PI.FYI | Signup',
	description: "A Taste of YOUR Taste"
};

export default function Index() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<SignupPanel className="mb-16" />
		</div>
	);
}