"use client";
import { HTMLAttributes, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useReposition } from "../hooks/useReposition";

interface Props extends HTMLAttributes<HTMLDivElement> {
	tooltip?: ReactNode
	showTooltip?: "onHover" | "onClick"
}

export function IconButton({ className, tooltip, children, showTooltip, ...props }: Props) {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const reposition = useReposition(tooltipRef);

	useEffect(reposition, [reposition]);
	return (
		<div className={["relative group", className].join(" ")} onResize={reposition} {...props}>
			{children}
			{tooltip && <div ref={tooltipRef} className={[
				"pointer-events-none inline transition-all opacity-0",
				"absolute top-8 left-1/2 -translate-x-1/2 text-center p-1 bg-bgColor uppercase",
				"border border-textColor font-bold text-xs whitespace-nowrap",
				showTooltip == "onClick" ?
					`group-focus:scale-100 group-focus:opacity-100 group-focus:drop-shadow-md group-focus:pointer-events-auto
					hover:scale-100 hover:opacity-100 hover:drop-shadow-md hover:pointer-events-auto` :
					"group-hover:scale-100 group-hover:opacity-100 group-hover:drop-shadow-md group-hover:pointer-events-auto"
			].join(" ")}>
				{tooltip}
			</div>}
		</div>
	);

}