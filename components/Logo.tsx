import Image from "next/image"
export function Logo() {
	return <Image
		className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
		src="/img/logo.svg"
		alt="The Perfectly Imperfect logo."
		width={180}
		height={37}
		priority
	/>
}