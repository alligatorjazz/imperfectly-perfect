"use client";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getLoginProfile, login, logout, updateProfile } from "../lib/api";
import { UserProfile } from "../types";
import { useLoginProfile } from "../hooks/useLoginProfile";

type Inputs = {
	username: string
	displayName: string
}

export function SettingsPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const profile = useLoginProfile();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (profile) {
			await updateProfile({ username: data.username ?? profile.username, display_name: data.displayName ?? profile.display_name });
			window.location.reload();
		}
	};

	// const changePhoto = async () => {
	// 	if (profile) {
	// 		const newUrl = prompt([
	// 			"Paste a photo url here: "
	// 		].join("\n"));

	// 		if (newUrl) {
	// 			await updateProfile({ avatar: newUrl });
	// 			window.location.reload();
	// 		}
	// 	}
	// };
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="flex gap-2 mb-4">
				<button type="submit" className="font-primary font-bold px-3 py-2 text-xs uppercase bg-primary text-bgColor">Save Changes</button>
				<button onClick={() => { logout(); router.push("/"); }} type="button" className="font-primary font-bold px-3 py-2 text-xs uppercase border border-primary text-primary">Logout</button>
			</div>
			<div className="py-4 border-y border-y-textColor border-dashed">
				<div className="flex flex-col gap-3">
					{profile && <>
						<div className="flex flex-col gap-1 max-w-md">
							<label className="uppercase font-bold font-primary text-sm">
								Screen Name - 
{' '}
{" "}
								<span className="italic">Peasants Permitted</span>
							</label>
							<input {...register("username")} type="text" className="px-2 py-1 font-secondary  border border-black bg-blue-100" required placeholder={profile?.username ?? ""} />
						</div>
						<div className="flex flex-col gap-1 max-w-md">
							<label className="uppercase font-bold font-primary text-sm">Display Name</label>
							<input {...register("displayName")} type="text" className="px-2 py-1 font-secondary border border-black bg-blue-100" required placeholder={profile?.display_name ?? ""} />
						</div>
					</>
					}
				</div>
			</div>

		</form>
	);
}