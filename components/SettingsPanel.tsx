"use client";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getLoginProfile, login } from "../lib/api";
import { UserProfile } from "../types";

type Inputs = {
	username: string
	displayName: string
}

export function SettingsPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	// TODO: loading indicator + input lock when logging in
	const [profile, setProfile] = useState<UserProfile>();
	useEffect(() => {
		if (!profile) {
			getLoginProfile()
				.then(result => {
					result ? setProfile(result) : router.push("/")
				}).catch(err => {
					console.error(err);
					router.push("/");
				})
		}
	}, [profile])
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col">
			<div className="flex gap-2 mb-4">
				<button className="font-primary font-bold px-3 py-2 text-xs uppercase bg-primary text-bgColor">Save Changes</button>
				<button className="font-primary font-bold px-3 py-2 text-xs uppercase border border-primary text-primary">Change Photo</button>
			</div>
			<div className="py-4 border-y border-y-textColor border-dashed">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
					{profile && <>
						<div className="flex flex-col gap-1 max-w-md">
							<label className="uppercase font-bold font-primary text-sm">Screen Name - <span className="italic">Peasants Permitted</span></label>
							<input {...register("username")} type="text" className="px-2 py-1 font-secondary  border border-black bg-blue-100" required placeholder={""} />
						</div>
						<div className="flex flex-col gap-1 max-w-md">
							<label className="uppercase font-bold font-primary text-sm">Display Name</label>
							<input {...register("displayName")} type="text" className="px-2 py-1 font-secondary border border-black bg-blue-100" required placeholder={""} />
						</div>
						<button type="submit" className="font-primary w-min px-4 py-2 mt-4 text-bgColor bg-primary font-bold uppercase text-sm">Submit</button>
					</>
					}
				</form>
			</div>

		</div>
	);
}