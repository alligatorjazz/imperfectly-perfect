import { useCallback, useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(onClickOutside: (e: Event) => void) {
	const ref = useRef<T>(null);
	const checkClickOutside = useCallback((e: Event) => {
		const clickedInside = e.target === ref.current || ref.current?.contains(e.target);
		if (!clickedInside) {
			onClickOutside(e);
		}
	}, [onClickOutside]);

	useEffect(() => {
		if (ref.current) {
			document.addEventListener("click", checkClickOutside);
		}
		return () => document.removeEventListener("click", checkClickOutside);
	}, [checkClickOutside]);

	return ref;
}