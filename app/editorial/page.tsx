import { FiSearch } from "react-icons/fi";
import { dummyEditorials } from "../../dummy";
import { EditorialCard } from "../../components/EditorialCard";
import { SearchBar } from "../../components/SearchBar";

export default function Index() {
	return (
		<div>
			<h1 className="text-3xl text-primary font-bold uppercase text-center flex flex-col gap-4 mb-8">
				New From
				<span className={["text-6xl text-primary text-stroke-1 text-stroke-tertiary"].join(" ")}>
					Perfectly Imperfect
				</span>
			</h1>
			<SearchBar />
			<div className="grid grid-cols-2 gap-6 w-full justify-items-center font-semibold text-xs">
				{dummyEditorials.map(editorial => <EditorialCard key={editorial.timestamp + editorial.guest} editorial={editorial} className="max-w-md w-full h-full" />)}
			</div>
		</div>
	);
}