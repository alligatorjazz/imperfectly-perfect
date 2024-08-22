import { HTMLAttributes } from "react";

export function Header({ className, level, children, ...props }: HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
	const headerClasses = "font-bold text-secondary uppercase text-stroke-1 text-stroke-tertiary";
	const fullClassName = [headerClasses, className].join(" ");
	const headingLevel = level ?? 7;
	switch (headingLevel) {
		case 1:
			return <h1 className={fullClassName}>{children}</h1>;
		case 2:
			return <h2 className={fullClassName}>{children}</h2>;
		case 3:
			return <h3 className={fullClassName}>{children}</h3>;
		case 4:
			return <h4 className={fullClassName}>{children}</h4>;
		case 5:
			return <h5 className={fullClassName}>{children}</h5>;
		case 6:
			return <h6 className={fullClassName}>{children}</h6>;
		case 7:
			return <div className={fullClassName}>{children}</div>;
	}
}