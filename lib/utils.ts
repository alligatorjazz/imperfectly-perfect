export function isExternalURL(url: string) {
	if (url.startsWith("/")) {
		return false;
	}

	if (url.startsWith(".")) {
		return false;
	}
	if (url.startsWith(location.origin)) {
		return false;
	}
	
	return true;
}
