"use client";
import { Emoji } from 'emoji-type';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiImage, FiLink, FiTrash } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { UserPost } from '../types';
import { Button } from './Button';
import { EmojiSelector } from './EmojiSelector';
import { v4 } from "uuid";
import { useLoginId } from '../hooks/useLoginId';
import { createPost, login } from '../lib/api';
import { useFileUpload } from '../hooks/useFileUpload';
import Image from 'next/image';
import { IconButton } from './IconButton';

type Inputs = Pick<UserPost, "headline" | "image" | "link" | "body">

export function PostInput() {
	const [bodyVisible, setBodyVisible] = useState(false);
	const [emoji, setEmoji] = useState<Emoji>("⭐️");
	const [image, setImage] = useState<string | null>(null);
	const [link, setLink] = useState<string | null>(null);
	const { url: imageUrl, status, upload, clear } = useFileUpload();

	const loginId = useLoginId();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (loginId) {
			const postData: UserPost = {
				...data,
				emoji,
				id: v4(),
				created_at: new Date().toISOString(),
				author: loginId,
				image,
				link
			};

			createPost(postData)
				.then(() => window.location.reload())
				.catch(err => console.error(err));
		}
	};

	useEffect(() => {
		setImage(imageUrl ?? null);
		console.log(imageUrl);
	}, [imageUrl]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full border border-dashed border-textColor">
			{loginId && <>
				<TextareaAutosize {...register("headline")} className="w-full focus-visible:outline-none max-h-[8rem] scrollbar-none font-bold text-xl uppercase placeholder:opacity-40" placeholder="What have you been into?" onFocus={() => setBodyVisible(true)}></TextareaAutosize>
				{bodyVisible && <TextareaAutosize {...register("body")} className="w-full focus-visible:outline-none min-h-[4rem] max-h-[10rem] scrollbar-none font-content leading-tight placeholder:opacity-40" placeholder='Share what you love.'></TextareaAutosize>}
				{image && <div className='flex items-center w-full h-32 gap-2 relative mb-4'>
					<Image
						src={image}
						width={250}
						height={150}
						alt="A user-uploaded image."
						className='h-full max-w-[66%] w-auto object-contain'
					/>
					<IconButton tooltip="Delete Image" onClick={() => {
						clear();
					}}>
						<FiTrash />
					</IconButton>
				</div>}
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<EmojiSelector emoji={emoji} setEmoji={setEmoji} />
						{/* TODO: enable link / image support */}
						<button type='button' onClick={upload}>
							<FiImage size={20} />
						</button>
						<button onClick={() => setLink(prompt("Paste your link's URL:"))}><FiLink size={20} /></button>
					</div>
					<Button>Share</Button>
				</div>
			</>}
		</form>
	);
}