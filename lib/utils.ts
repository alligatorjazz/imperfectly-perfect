export function isExternalURL(url: string) {
	if (url.startsWith("/")) {
		return false;
	}

	if (url.startsWith(".")) {
		return false;
	}

	return true;
}

// escapes the colons in ids
export function getProfileLink(id: string) {
	return encodeURI("/profile/" + id);
}

export function isInViewport(element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	const html = document.documentElement;
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight) &&
		rect.right <= (window.innerWidth)
	);
}