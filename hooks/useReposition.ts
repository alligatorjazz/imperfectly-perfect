import { RefObject, useCallback } from "react";

export function useReposition<T extends HTMLElement>(ref: RefObject<T>) {
	const reposition = useCallback(() => {
		if (!ref.current) {
			return;
		}

		const element = ref.current;

		// Get calculated tooltip coordinates and size
		const rect = element.getBoundingClientRect();
		// push tooltip in bounds (horizontally)
		if (rect.left < 0) {
			element.style.left = `calc(50% - ${rect.left}px)`;
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
	}, [ref]);

	return reposition;
}