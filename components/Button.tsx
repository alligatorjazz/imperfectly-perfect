import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button className={[className, "px-2 py-1 uppercase text-bgColor bg-primary text-sm font-semibold"].join(" ")} {...props}>{children}</button>;
}