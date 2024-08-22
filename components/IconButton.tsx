"use client";
import { HTMLAttributes, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
	tooltip?: string
}

export function IconButton({ className, tooltip, children }: Props) {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const reposition = useCallback(() => {
		if (!tooltipRef.current) {
			return;
		}

		const element = tooltipRef.current;

		// Get calculated tooltip coordinates and size
		const rect = element.getBoundingClientRect();

		// push tooltip in bounds (horizontally)
		if (rect.left < 0) {
			element.style.left = `calc(50% - ${rect.left}px)`
		}
		if (rect.right > window.innerWidth) {
			element.style.left = `calc(50% - ${rect.right - window.innerWidth}px)`
		}

		// push tooltip in bounds (vertically)
		if (rect.top < 0) {
			element.style.top = `calc(50% - ${rect.top}px)`
		}
		if (rect.bottom > window.innerHeight) {
			element.style.top = `calc(50% - ${rect.bottom - window.innerHeight}px)`
		}
	}, [])


	return (
		<button className={["relative group", className].join(" ")} onMouseEnter={reposition}>
			{children}
			{tooltip && <div ref={tooltipRef} className="absolute top-8 left-1/2 -translate-x-1/2 text-center p-1 hidden bg-bgColor border border-textColor font-bold text-xs whitespace-nowrap uppercase group-hover:inline">{tooltip}</div>}
		</button>
	);

}