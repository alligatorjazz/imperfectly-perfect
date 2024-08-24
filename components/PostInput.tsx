"use client";
import { Emoji } from 'emoji-type';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiAlertTriangle, FiImage, FiLink, FiTrash } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { UserPost } from '../types';
import { Button } from './Button';
import { EmojiSelector } from './EmojiSelector';
import { v4 } from "uuid";
import { useLoginId } from '../hooks/useLoginId';
import { createPost, getPost, login } from '../lib/api';
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
		formState: { errors, isValid },
		clearErrors
	} = useForm<Inputs>({ "mode": "onSubmit" });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log("submitting...");
		if (loginId && isValid) {
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
				.catch(err => console.error(err))
				.finally(() => getPost(postData.id).then(remote => {
					if (remote?.id == postData.id) {
						window.location.reload();
					}
				}));
		} else if (!isValid) {
			console.error(errors);
			alert("Couldn't post: \n" + Object.values(errors).join("\n"));
		}
	};

	useEffect(() => {
		setImage(imageUrl ?? null);
	}, [imageUrl]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full border border-dashed border-textColor">
			{loginId && <>
				<TextareaAutosize {...register("headline", { required: true, minLength: { value: 1, message: "Your title must be at least 5 characters." } })} onChange={() => clearErrors("headline")} className="w-full focus-visible:outline-none max-h-[8rem] scrollbar-none font-bold text-xl uppercase placeholder:opacity-40" placeholder="What have you been into?" onFocus={() => setBodyVisible(true)}></TextareaAutosize>
				{errors.headline && <div className='text-red-500 font-bold text-xs uppercase mb-2 flex items-center gap-1'>
					<FiAlertTriangle color='red' />
					<p>{"You've gotta have a title."}</p>
				</div>}
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
							<FiImage size={20} color={image ? "blue" : ""} />
						</button>
						<button type='button' onClick={() => {
							try {
								const input = prompt("Put your URL here: ");
								if (!input) {
									return;
								}
								const url = new URL(input);
								setLink(url.toString());
							} catch (err) {
								console.error(err);
								alert("The URL you entered was not valid.");
							}
						}}>
							<FiLink size={20} color={link ? "blue" : ""} />
						</button>
					</div>
					<Button type='submit'>Share</Button>
				</div>
			</>}
		</form>
	);
}