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