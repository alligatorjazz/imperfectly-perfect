import { HTMLAttributes } from "react";
import { UserProfile } from "../types";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { Header } from "./Header";

interface Props extends HTMLAttributes<HTMLDivElement> {
	user: UserProfile
}

export function UserCard({ user }: Props) {
	return (
		<a href="/profile">
			<div className="flex flex-col gap-2 border border-dashed border-textColor p-4 w-48">
				<a href="/404" className="text-center"><Header level={1} className="text-xl whitespace-nowrap overflow-hidden overflow-ellipsis w-full">@{user.username}</Header></a>
				{/* TODO: add getRecs function */}
				<p className="uppercase opacity-40 font-bold text-center">No recs yet..</p>
				<Image
					src={faker.image.urlPlaceholder({ width: 128, height: 128 })}
					alt="placeholder"
					width={128}
					height={128}
					className="contain w-full"
				/>
				<div className="flex gap-2 justify-center w-full">
					<button className="w-1/2 uppercase p-1 bg-primary text-bgColor font-bold text-sm">Follow</button>
					<button className="w-1/2 uppercase px-3 font-bold text-sm border border-primary text-primary">View</button>
				</div>
			</div>
		</a>
	);
}