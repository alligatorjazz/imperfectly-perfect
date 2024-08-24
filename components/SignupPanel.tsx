"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, restoreSession, signUp } from "../lib/api";
import Link from "next/link";

type Inputs = {
	email: string
	password: string
}

export function SignupPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	// TODO: loading indicator + input lock when logging in

	const router = useRouter();
	useEffect(() => {
		restoreSession().then(session => {
			if (session) {
				router.push("/home");
			}
		});
	}, [router]);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const { user } = await signUp(data.email, data.password as string);
		if (user) {
			router.push("/home");
		} else {
			setError("root", { message: "Your signup didn't go through - give it another try." });
		}
	};

	return (
		<div className={["w-7/12 max-w-lg flex flex-col gap-4 border border-dashed border-textColor p-8", className].join(" ")}>
			<Image
				src={"/img/blue-star.avif"}
				width={48}
				height={48}
				alt="A blue star."
			/>
			<p className="uppercase font-bold font-primary text-lg">Sign Up</p>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
				<input {...register("email")} type="text" className="px-2 py-1 font-secondary  border border-black bg-blue-100" required placeholder="Email" />
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