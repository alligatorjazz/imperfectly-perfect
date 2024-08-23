import { faker } from "@faker-js/faker";
import { Header } from "../../../components/Header";
import Image from "next/image";
import { PostList } from "../../../components/PostList";


export default function Dummy() {
	return (
		<div className="flex flex-col">
			<Header level={1} className="text-[7rem] leading-[6rem] text-center mb-4">Media Luminary</Header>
			<p className="font-secondary text-xl leading-6 mb-4">
				<span className="font-bold underline underline-offset-3 decoration-dashed">Media Luminary</span>
				{" is " + faker.lorem.paragraphs(5).split(" ").slice(1).join(" ")}
			</p>
			<Image
				src={faker.image.urlPlaceholder({ width: 128, height: 128 })}
				alt={`A placeholder.`}
				width={128}
				height={128}
				className="w-full object-contain mb-2"
			/>
			<div className="w-full flex gap-2 uppercase justify-center items-center p-4">
				<p>2D ago by</p>
				<span className="font-bold text-lg">@PERFECTLYIMPERFECT + @DUMMY</span>
			</div>
			{/* <PostList posts={dummyPosts.slice(0, 5)} /> */}
			<p>unimplemented</p>
		</div>
	);
}