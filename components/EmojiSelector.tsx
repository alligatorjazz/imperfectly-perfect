"use client";
import EmojiPicker from "emoji-picker-react";
import { Emoji } from "emoji-type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TooltipContainer, TooltipContainerProps } from "./TooltipContainer";

interface Props extends Omit<TooltipContainerProps, "tooltip" | "onClick" | "className"> {
	emoji: Emoji;
	setEmoji: Dispatch<SetStateAction<Emoji>>;
}

export function EmojiSelector({ emoji, setEmoji, ...props }: Props) {
	const [pickerOpen, setPickerOpen] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	useEffect(() => {
		setShowTooltip(pickerOpen);
	}, [pickerOpen]);
	
	return (
		<TooltipContainer
			tooltip={<EmojiPicker
				open={pickerOpen}
				onEmojiClick={({ emoji: newEmoji }) => setEmoji(newEmoji as Emoji)}
				className={showTooltip ? "" : "opacity-0 w-1/3 max-w-md"}
				width={"auto"}
			/>}
			onClick={() => setPickerOpen(prev => !prev)}
			onBlur={() => setPickerOpen(false)}
			className="hover:cursor-pointer"
			show={showTooltip}
			{...props}
		>
			{emoji}
		</TooltipContainer>
	);
};