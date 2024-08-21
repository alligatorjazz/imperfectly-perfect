import type { Metadata } from 'next'
import { Navbar } from '../components/Navbar'
import localFont from 'next/font/local'

const arialNarrow = localFont({
	src: [
		{
			path: './fonts/arialnarrow.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/arialnarrow_italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './fonts/arialnarrow_bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/arialnarrow_bolditalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
})

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={arialNarrow.className}>
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	)
}