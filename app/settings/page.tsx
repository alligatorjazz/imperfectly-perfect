import router from "next/router";
import { SubmitHandler } from "react-hook-form";
import { Header } from "../../components/Header";
import { SettingsPanel } from "../../components/SettingsPanel";


export default async function Settings() {
	return (
		<div>
			<Header level={1} className="text-6xl w-full text-center my-12">Settings</Header>
			<SettingsPanel />
		</div>
	);
}
