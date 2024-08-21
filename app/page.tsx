import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Home',
	description: 'Welcome to Next.js',
}

export default function Index() {
	return <h1 className="text-primary">Hello world!</h1>
}