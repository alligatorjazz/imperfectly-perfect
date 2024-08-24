"use client";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { useReposition } from "../hooks/useReposition";

export interface TooltipContainerProps extends HTMLAttributes<HTMLDivElement> {
	tooltip: ReactNode
	show?: boolean
}

export function TooltipContainer({ className, children, tooltip, show, ...props }: TooltipContainerProps) {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const reposition = useReposition(tooltipRef);
	useEffect(reposition, [reposition, show]);
	return (
		<div className={["relative group", className].join(" ")} onResize={reposition} onClick={reposition} {...props}>
			{children}
			<div ref={tooltipRef} className={[
				"absolute top-8 left-1/4 text-center p-1 bg-bgColor uppercase",
				"border border-textColor font-bold text-xs whitespace-nowrap",
				show ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-50 w-0 h-0"
			].join(" ")}>
				{tooltip}
			</div>
		</div>
	);
}

