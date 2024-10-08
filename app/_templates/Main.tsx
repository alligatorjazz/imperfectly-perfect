import { Navbar } from '../../components/Navbar';
import localFont from 'next/font/local';
import "../globals.css";
import { NavLinks } from '../../types';
import { HTMLAttributes } from 'react';
import { globalNavLinks } from '../_nav';

const arialNarrow = localFont({
	src: [
		{
			path: '../../assets/fonts/arialnarrow.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/arialnarrow_italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../assets/fonts/arialnarrow_bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/arialnarrow_bolditalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
});


interface Props extends HTMLAttributes<HTMLDivElement> {

}

export function MainTemplate({ children, className, ...props }: Props) {
	return (
		<div className={[arialNarrow.className, "min-h-screen bg-bgColor text-textColor", className].join(" ")} {...props}>
			<Navbar links={globalNavLinks} />
			<div>{children}</div>
		</div >
	);
}