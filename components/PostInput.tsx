"use client";
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './Button';
import { FiImage, FiLink } from 'react-icons/fi';

export function PostInput() {
	const [bodyVisible, setBodyVisible] = useState(false);

	return (
		<div className="p-4 w-full border border-dashed border-textColor">
			<TextareaAutosize className="w-full focus-visible:outline-none max-h-[8rem] scrollbar-none font-bold text-xl uppercase placeholder:opacity-40" placeholder="What have you been into?" onFocus={() => setBodyVisible(true)}></TextareaAutosize>
			{bodyVisible && <TextareaAutosize className="w-full focus-visible:outline-none min-h-[4rem] max-h-[10rem] scrollbar-none font-content leading-tight placeholder:opacity-40" placeholder='Share what you love.'></TextareaAutosize>}
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center'>
					<button className='text-xl'>⭐️</button>
					<FiImage size={20} />
					<FiLink size={20} />
				</div>
				<Button>Share</Button>
			</div>
		</div>
	);
}