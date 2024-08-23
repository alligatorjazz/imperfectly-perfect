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
			element.style.left = `calc(50% - ${rect.left }px)`;
		}
		if (rect.right > window.innerWidth) {
			element.style.left = `calc(50% - ${rect.right - window.innerWidth}px)`;
		}
		
		// // push tooltip in bounds (vertically)
		// if (rect.top * 2< 0) {
		// 	element.style.top = `calc(50% - ${rect.top * 2}px)`
		// }
		// if (rect.bottom * 2 > window.innerHeight) {
		// 	element.style.top = `calc(50% - ${rect.bottom * 2 - window.innerHeight}px)`
		// }
	}, []);

	useEffect(reposition, []);
	return (
		<button className={["relative group", className].join(" ")} onResize={reposition}>
			{children}
			{tooltip && <div ref={tooltipRef} className="pointer-events-none inline transition-all opacity-0  absolute top-8 left-1/2 -translate-x-1/2 text-center p-1 bg-bgColor border border-textColor font-bold text-xs whitespace-nowrap uppercase group-hover:scale-100 group-hover:opacity-100 group-hover:drop-shadow-md group-hover:pointer-events-auto">{tooltip}</div>}
		</button>
	);

}