import { dummyPosts } from "../dummy";
import { SortCategories } from "../types";
import { PostList } from "./PostList";

export function SortableFeed() {
	return (
		<div>
			<select className="border border-dashed border-textColor px-2 py-1 rounded-none focus:border-primary focus:border-solid outline-none uppercase font-bold mb-8 w-full">
				{SortCategories.map(({ emoji, title }) => (
					<option key={emoji + title}>{[emoji, title].join(" ")}</option>
				))}
			</select>
			<PostList posts={dummyPosts}/>
		</div>
	);
}