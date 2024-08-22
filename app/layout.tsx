import type { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import localFont from 'next/font/local';
import "./globals.css";
import { NavLinks } from '../types';

const arialNarrow = localFont({
	src: [
		{
			path: '../assets/fonts/arialnarrow.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/arialnarrow_italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../assets/fonts/arialnarrow_bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../assets/fonts/arialnarrow_bolditalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
});

const globalNavLinks: NavLinks = [
	{ href: "/home", title: "Home" },
	{ href: "/editorial", title: "Editorial" },
	{ href: "https://apps.apple.com/us/app/pi-fyi-by-perfectly-imperfect/id6474037926", title: "The PI.FYI App" }
];

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}