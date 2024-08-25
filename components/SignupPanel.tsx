"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, restoreSession, signUp } from "../lib/api";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

type Inputs = {
	email: string
	password: string
}

export function SignupPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	
	const [locked, setLocked] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setLocked(true);
		restoreSession().then(session => {
			if (session) {
				router.push("/home");
			}
		}).finally(() => setLocked(false));
	}, [router]);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLocked(true);
		try {
			const { success, error } = await signUp(data.email, data.password as string);
			if (success) {
				router.push("/home");
			} else {
				if (error?.code === "user_already_exists")
					setError("root", { message: "You already have an account." });
			}
		} catch (error) {
			console.error(error);
			setError("root", { message: "There was an error with your signup - refresh and try again." });
		}

		setLocked(false);
	};

	return (
		<div className={["w-3/4 max-w-lg flex flex-col gap-4 border border-dashed border-textColor p-8", locked ? "opacity-50 select-none brightness-75" : "", className].join(" ")}>
			<Image
				src={"/img/blue-star.avif"}
				width={48}
				height={48}
				alt="A blue star."
			/>
			<p className="uppercase font-bold font-primary text-lg">Sign Up</p>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
				{errors.root && <div className='text-red-500 font-bold text-xs uppercase mb-2 flex items-center gap-1'>
					<FiAlertTriangle color='red' />
					<p>{errors.root.message}</p>
				</div>}
				<input {...register("email")} type="email" className="px-2 py-1 font-secondary  border border-black bg-blue-100" required placeholder="Email" />
				<input {...register("password")} type="password" className="px-2 py-1 font-secondary border border-black bg-blue-100" required placeholder="Password" />
				<button type="submit" className="font-primary w-min px-4 py-2 mt-4 text-bgColor bg-primary font-bold uppercase text-sm">Submit</button>
			</form>
			<p className="font-bold font-primary uppercase opacity-30">
				Have an account? Sign in
				{' '}
				{" "}
				<Link className="underline decoration-dashed" href={"/"}>here.</Link>
			</p>
		</div>
	);
}