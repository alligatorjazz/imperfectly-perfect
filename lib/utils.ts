export function isExternalURL(url: string) {
	if (url.startsWith("/")) {
		return false;
	}

	if (url.startsWith(".")) {
		return false;
	}
	
	return true;
}
