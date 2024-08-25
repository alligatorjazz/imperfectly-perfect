"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, restoreSession } from "../lib/api";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

type Inputs = {
	email: string
	password: string
}

export function LoginPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const [locked, setLocked] = useState(false);
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
		const { user, session } = await login(data.email, data.password as string);
		if (user && session) {
			router.push("/home");
		} else {
			setError("root", { message: "Your email or password was incorrect." });
		}
		setLocked(false);
	};

	return (
		<div className={[
			"w-3/4 max-w-lg flex flex-col gap-4 border border-dashed border-textColor p-8 transition-all",
			locked ? "opacity-50 select-none brightness-75" : "",
			className
		].join(" ")}>
			<Image
				src={"/img/blue-star.avif"}
				width={48}
				height={48}
				alt="A blue star."
			/>
			<p className="uppercase font-bold font-primary text-lg">Sign in via password.</p>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
				{errors.root && <div className='text-red-500 font-bold text-xs uppercase mb-2 flex items-center gap-1'>
					<FiAlertTriangle color='red' />
					<p>{"Your login credentials are incorrect."}</p>
				</div>}
				<input {...register("email", { required: true })} type="email" className="px-2 py-1 font-secondary  border border-black bg-blue-100" required placeholder="Email" />
				{errors.email && <div className='text-red-500 font-bold text-xs uppercase mb-2 flex items-center gap-1'>
					<FiAlertTriangle color='red' />
					<p>{"Please enter an email."}</p>
				</div>}
				<input {...register("password", { required: true })} type="password" className="px-2 py-1 font-secondary border border-black bg-blue-100" required placeholder="Password" />
				{errors.password && <div className='text-red-500 font-bold text-xs uppercase mb-2 flex items-center gap-1'>
					<FiAlertTriangle color='red' />
					<p>{"Please enter a password."}</p>
				</div>}
				<button type="submit" className="font-primary w-min px-4 py-2 mt-4 text-bgColor bg-primary font-bold uppercase text-sm">Submit</button>
			</form>
			<p className="font-bold font-primary uppercase opacity-30">
				New? Sign up
				{' '}
				{" "}
				<Link className="underline decoration-dashed" href={"/signup"}>here.</Link>

			</p>
		</div>
	);
}