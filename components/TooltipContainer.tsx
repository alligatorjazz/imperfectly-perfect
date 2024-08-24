"use client";
import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import { useReposition } from "../hooks/useReposition";

export interface TooltipContainerProps extends HTMLAttributes<HTMLDivElement> {
	tooltip: ReactNode
	tooltipClassName?: string
	show?: boolean
}

export function TooltipContainer({ className, children, tooltip, show, tooltipClassName, ...props }: TooltipContainerProps) {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const reposition = useReposition(tooltipRef);
	useEffect(reposition, [reposition, show]);
	return (
		<div className={["relative group tooltip", className].join(" ")} onResize={reposition} onClick={reposition} {...props}>
			{children}
			<div ref={tooltipRef} className={[
				"absolute top-8 left-1/2 -translate-x-1/2 text-center p-1 bg-bgColor uppercase",
				"border border-textColor font-bold text-xs whitespace-nowrap",
				tooltipClassName?? "",
				show ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-50"
			].join(" ")}>
				{tooltip}
			</div>
		</div>
	);
}

