"use client";
import { Emoji } from 'emoji-type';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiImage, FiLink } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { UserPost } from '../types';
import { Button } from './Button';
import { EmojiSelector } from './EmojiSelector';

type Inputs = Pick<UserPost, "headline" | "image" | "link" | "body" | "emoji">

export function PostInput() {
	const [bodyVisible, setBodyVisible] = useState(false);

	const [pickerVisible, setPickerVisible] = useState(false);
	const [emoji, setEmoji] = useState<Emoji>("⭐️");

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
	};

	return (
		<form className="p-4 w-full border border-dashed border-textColor">
			<TextareaAutosize {...register("headline")} className="w-full focus-visible:outline-none max-h-[8rem] scrollbar-none font-bold text-xl uppercase placeholder:opacity-40" placeholder="What have you been into?" onFocus={() => setBodyVisible(true)}></TextareaAutosize>
			{bodyVisible && <TextareaAutosize {...register("body")} className="w-full focus-visible:outline-none min-h-[4rem] max-h-[10rem] scrollbar-none font-content leading-tight placeholder:opacity-40" placeholder='Share what you love.'></TextareaAutosize>}
			<div className='flex justify-between items-center'>
				<div className='flex gap-2 items-center z-20'>
					<EmojiSelector emoji={emoji} setEmoji={setEmoji}/>
					<FiImage size={20} />
					<FiLink size={20} />
				</div>
				<Button>Share</Button>
			</div>
		</form>
	);
}