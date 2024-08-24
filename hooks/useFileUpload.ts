import { useCallback, useEffect, useState } from "react";
import { getPublicUrl, uploadFile } from "../lib/api";

enum UploadStatus { Idle, Working, Complete };
export function useFileUpload() {
	const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);
	const [status, setStatus] = useState<UploadStatus>(UploadStatus.Idle);
	const [url, setUrl] = useState<string | null>(null);
	const [fileType, setFileType] = useState<string>();
	const clear = useCallback(() => {
		setStatus(UploadStatus.Idle);
		setFileData(null);
		setUrl(null);
	}, []);
	const upload = useCallback(() => {
		setStatus(UploadStatus.Working);
		const virtualElement = document.createElement("input");
		virtualElement.type = "file";
		virtualElement.addEventListener("change", (e) => {
			const element = e.target as HTMLInputElement & { type: "file" };
			const file = element.files?.[0];
			if (!file) {
				console.warn("No file selected.");
				setStatus(UploadStatus.Idle);
				return;
			}
			setFileType(file.type);
			file.arrayBuffer().then(buffer => setFileData(buffer));
		});

		virtualElement.click();
	}, []);


	useEffect(() => {
		if (fileData) {
			console.log(fileData);
			uploadFile(fileData, fileType)
				.then((result) => {
					if (result) {
						getPublicUrl(result.path)
							.then(publicUrl => setUrl(publicUrl))
							.catch(err => console.error(err));
					} else {
						throw new Error("File upload failed.");
					}
				})
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					setFileData(null);
					setStatus(UploadStatus.Idle);
				});
		}

		if (url) {
			setStatus(UploadStatus.Complete);
		}
	}, [fileData, fileType, url]);

	return { url, status, upload, clear };
}